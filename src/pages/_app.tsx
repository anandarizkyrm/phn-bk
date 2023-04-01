import Layout from '@/components/Layout';
import type { AppProps } from 'next/app';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Toaster } from 'react-hot-toast';
import ContactContextProvider from '@/context/contacts';

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL,
  cache: new InMemoryCache(),
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ContactContextProvider>
        <Layout>
          <Toaster position="top-center" reverseOrder={false} />
          <Component {...pageProps} />
        </Layout>
      </ContactContextProvider>
    </ApolloProvider>
  );
}
