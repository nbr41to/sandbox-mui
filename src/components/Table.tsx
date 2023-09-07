import { FC, useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
import dummy_data from '../__mocks__/table_data.json';

type TableDate = {
  id: number;
  name: string;
  age: number;
  email: string;
};

const columns: ColumnDef<TableDate>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
];

// const columnHelper = createColumnHelper<TableDate>();
// const columns = [
//   columnHelper.accessor('id', {
//     cell: (info) => <div>{info.getValue()}</div>,
//     footer: (info) => <div>{info.column.id}</div>,
//   }),
//   columnHelper.accessor('name', {
//     cell: (info) => <div>{info.getValue()}</div>,
//     header: () => <div>Name</div>,
//     footer: (info) => info.column.id,
//   }),
//   columnHelper.accessor('age', {
//     cell: (info) => <div>{info.getValue()}</div>,
//     header: () => <div>Age</div>,
//     footer: (info) => info.column.id,
//   }),
//   columnHelper.accessor('email', {
//     cell: (info) => <div>{info.getValue()}</div>,
//     header: () => <div>Email</div>,
//     footer: (info) => info.column.id,
//   }),
// ];

type Props = {};

export const Table: FC<Props> = () => {
  const [data, setData] = useState(() => [...dummy_data]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>

      <tfoot>
        {table.getFooterGroups().map((footerGroup) => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext(),
                    )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
};
