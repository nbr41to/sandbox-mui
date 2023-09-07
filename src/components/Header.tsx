import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {};

export const Header: FC<Props> = () => {
  const { pathname } = useRouter();

  return (
    <div className='flex flex-col gap-2 p-4'>
      <Link
        href='/'
        className={`text-lg font-bold ${
          pathname === '/' ? 'text-blue-500' : ''
        }`}
      >
        Home
      </Link>
      <Link
        href='/layout'
        className={`text-lg font-bold ${
          pathname === '/layout' ? 'text-blue-500' : ''
        }`}
      >
        Layout
      </Link>
      <Link
        href='/form'
        className={`text-lg font-bold ${
          pathname === '/form' ? 'text-blue-500' : ''
        }`}
      >
        Form
      </Link>
      <Link
        href='/table'
        className={`text-lg font-bold ${
          pathname === '/table' ? 'text-blue-500' : ''
        }`}
      >
        Table
      </Link>
    </div>
  );
};
