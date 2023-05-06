import Container from "@/components/Container";
import Meta from "@/components/Meta";
import { StoreProvider, newsStore } from "@/mobx/StoreProvider";
import fetchNewsAndSaveToDB from "@/mobx/fetchNewsAndSaveToDB";
import theme from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
// Remove blue outline from buttons and links
import "focus-visible/dist/focus-visible";
import { AnimatePresence } from "framer-motion";
// Lazy load images
import "lazysizes";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps, router }: AppProps) => {
  return (
    <>
      <Meta id="home" />

      <ChakraProvider theme={theme}>
        <Container>
          <AnimatePresence initial={false} mode="wait">
            <StoreProvider fetchedData={pageProps.fetchedData}>
              <Component {...pageProps} key={router.route} />
            </StoreProvider>
          </AnimatePresence>
        </Container>
      </ChakraProvider>
    </>
  );
};

App.getInitialProps = async () => {
  // If called on the client
  if (typeof window !== "undefined")
    return {
      pageProps: {
        fetchedData: {
          news: { articles: newsStore.articles, comments: newsStore.comments },
        },
      },
    };

  const news = await fetchNewsAndSaveToDB();
  return { pageProps: { fetchedData: { news } } };
};

export default App;
