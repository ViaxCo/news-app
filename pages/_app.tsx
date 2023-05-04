import { ChakraProvider } from "@chakra-ui/react";
// Remove blue outline from buttons and links
import Meta from "@/components/Meta";
import "focus-visible/dist/focus-visible";
import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import theme from "../theme";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Meta id="home" />

      <ChakraProvider theme={theme}>
        <AnimatePresence initial={false} mode="wait">
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </ChakraProvider>
    </>
  );
}
