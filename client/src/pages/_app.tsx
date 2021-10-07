import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import SocketProvider from "src/providers/SocketProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SocketProvider>
      <Head>
        <title>Chat</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <Component {...pageProps} />
    </SocketProvider>
  );
}
export default MyApp;
