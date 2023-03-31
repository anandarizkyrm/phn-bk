import Layout from '@/components/Layout';
import type { AppProps } from 'next/app';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

export const client = new ApolloClient({
  ssrMode: true,
  uri: process.env.NEXT_PUBLIC_API_URL,
  cache: new InMemoryCache(),
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Layout>
  );
}
