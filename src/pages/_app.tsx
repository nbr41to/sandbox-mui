import type { AppProps } from 'next/app';
import { Header } from '@/components/Header';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className='flex divide-x'>
      <Header />
      <div className='p-6 flex-grow'>
        <Component {...pageProps} />
      </div>
    </div>
  );
}
