import Container from "@/components/Container";
import Meta from "@/components/Meta";
import theme from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
// Remove blue outline from buttons and links
import "focus-visible/dist/focus-visible";
import type { AppProps } from "next/app";
import { Router } from "next/router";
import { useEffect, useState } from "react";

const App = ({ Component, pageProps }: AppProps) => {
  const [isLoading, setLoading] = useState(false);
  // Add loading indicator when routes change
  useEffect(() => {
    const start = () => setLoading(true);

    const end = () => setLoading(false);

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return (
    <>
      <Meta id="home" />

      <ChakraProvider theme={theme}>
        <Container isLoading={isLoading}>
          <Component {...pageProps} />
        </Container>
      </ChakraProvider>
    </>
  );
};

export default App;
