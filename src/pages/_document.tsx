import { Html, Head, Main, NextScript } from 'next/document';
import { Global, css } from '@emotion/react';
import { colors } from '@/styles/constants';
const globalStyles = css`
  body {
    margin: 0;
    padding: 0;
    background-color: ${colors.primaryDark};
    color: ${colors.light};
  }
`;
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Global styles={globalStyles} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
