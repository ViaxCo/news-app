import { ChakraProvider } from "@chakra-ui/react";
// Remove blue outline from buttons and links
import Container from "@/components/Container";
import Meta from "@/components/Meta";
import theme from "@/theme";
import "focus-visible/dist/focus-visible";
import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Meta id="home" />

      <ChakraProvider theme={theme}>
        <Container>
          <AnimatePresence initial={false} mode="wait">
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </Container>
      </ChakraProvider>
    </>
  );
}
