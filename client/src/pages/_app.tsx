import type { AppProps } from "next/app";
import Head from "next/head";
import SocketProvider from "src/providers/SocketProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SocketProvider>
      <Head>
        <title>Chat</title>
      </Head>
      <Component {...pageProps} />
    </SocketProvider>
  );
}
export default MyApp;
