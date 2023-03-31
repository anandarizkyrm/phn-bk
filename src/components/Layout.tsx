import Head from 'next/head';
import React from 'react';
import { Inter } from 'next/font/google';

type Props = {
  children: React.ReactNode;
};
const roboto = Inter({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});
const Layout = (props: Props) => {
  const { children } = props;
  return (
    <>
      <Head>
        <title>Phone Book</title>
        <meta name="description" content="Phone book app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={roboto.className}>{children}</main>
    </>
  );
};

export default Layout;
