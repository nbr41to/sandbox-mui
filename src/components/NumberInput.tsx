import { forwardRef, useId, useState } from 'react';
import { z } from 'zod';

type Value = number | '';
type Props = {
  label: string;
  value: Value;
  onChange: (number: Value) => void;
  onBlur?: () => void;

  min?: number;
  max?: number;
  precision?: number; // 小数点以下の桁数
  thousandsSeparator?: string; // 3桁ごとに区切る文字
};

/**
 * 数値入力のComponent
 * viewValue inputのvalueで表示用 string
 * onChange viewValueがnumberにparseできたらonChangeに渡す
 */
export const NumberInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      value,
      onChange,
      onBlur,
      min,
      max,
      precision = 0,
      thousandsSeparator,
    },
    ref,
  ) => {
    const id = useId();
    const [viewValue, setValueState] = useState(String(value ?? ''));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
      setValueState(e.target.value);

    const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        let value = e.target.value;

        /* , を削除 */
        value = value.replaceAll(',', '');

        /* 末尾の文字列を削除 */
        const regex = /[^-\de.+-]/;
        const match = value.match(regex);
        if (!!match?.index && match.index !== -1) {
          value = value.slice(0, match.index);
        }
        /* 2つ目以降の. を削除 */
        const regex2 = /\./g;
        const match2 = value.match(regex2);
        if (!!match2?.index && match2.index !== -1) {
          value = value.replace(regex2, '');
        }

        /* 小数点以下の桁数を制限 */
        const [integer, decimal] = value.split('.');
        if (decimal) {
          value = `${integer}.${decimal.slice(0, precision)}`;
        }

        const schema = z.coerce
          .number()
          .min(min ?? -Infinity)
          .max(max ?? Infinity);

        const parsedValue = schema.parse(value);
        const parsedValueStr = parsedValue.toString();
        if (thousandsSeparator) {
          /* 3つ区切りにする */
          let result = '';
          for (let i = 0, len = parsedValueStr.length; i < len; i++) {
            if (i % 3 === 0 && i !== 0) {
              result = `${thousandsSeparator}${result}`;
            }
            result = parsedValueStr[len - i - 1] + result;
          }
          setValueState(result);
        } else {
          setValueState(parsedValueStr);
        }

        onChange(parsedValue);
      } catch (error) {
        setValueState('');
        onChange('');
      }
      onBlur?.();
    };

    return (
      <div className='flex flex-col'>
        <label htmlFor={id}>{label}</label>
        <input
          className='border border-gray-300 rounded-md py-3 px-4'
          id={id}
          defaultValue={viewValue}
          value={viewValue}
          onChange={handleChange}
          onBlur={handleBlur}
          ref={ref}
        />
      </div>
    );
  },
);

NumberInput.displayName = 'NumberInput';
