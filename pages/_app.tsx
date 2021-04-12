import { ChakraProvider } from "@chakra-ui/react";
// Remove blue outline from buttons and links
import "focus-visible/dist/focus-visible";
import { AnimatePresence } from "framer-motion";
// Lazy load images
import "lazysizes";
import { GoogleFonts } from "next-google-fonts";
import { AppProps } from "next/app";
import Head from "next/head";
import Container from "../components/Container";
import fetchNewsAndSaveToDB from "../mobx/fetchNewsAndSaveToDB";
import { newsStore, StoreProvider } from "../mobx/StoreProvider";
import theme from "../theme";

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  return (
    <>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap" />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="News Application" />

        <title>News App</title>
      </Head>
      <ChakraProvider theme={theme}>
        <Container overflow="hidden">
          <AnimatePresence initial={false} exitBeforeEnter>
            <StoreProvider fetchedData={pageProps.fetchedData}>
              <Component {...pageProps} key={router.route} />
            </StoreProvider>
          </AnimatePresence>
        </Container>
      </ChakraProvider>
    </>
  );
};

MyApp.getInitialProps = async () => {
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

export default MyApp;
