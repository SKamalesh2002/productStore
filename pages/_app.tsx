import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "../components/navBar";

import { store } from "../store/store";
import { Provider } from "react-redux";
import Layout from "../components/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Layout view={<Component {...pageProps} />} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;

//model
//
