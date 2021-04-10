import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { chakra } from "@chakra-ui/system";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { BsArrowLeftShort as ArrowBackIcon } from "react-icons/bs";
import AddComment from "../../components/AddComment";
import ArticleNotFound from "../../components/ArticleNotFound";
import Comments from "../../components/Comments";
import LoadingArticle from "../../components/LoadingArticle";
import news from "../../mobx/NewsStore";

// Animation properties
const ease = [0.43, 0.13, 0.23, 0.96];
const pageVariants = {
  initial: {
    x: "50%",
    opacity: 0,
    transition: { ease, duration: 0.5 },
  },
  animate: {
    x: "0%",
    opacity: 1,
    transition: { ease, duration: 0.5 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0 },
  },
};

// Custom span component with chakra props
const Span = chakra("span");

const ArticlePage = observer(() => {
  const { query } = useRouter();
  const { slug } = query;
  const article = news.articles.find(article => article.id === slug);

  useEffect(() => {
    // Fetch news if array is empty (i.e on reload/first load)
    if (news.articles.length === 0) news.fetchArticles();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Head>
        <title>{article?.title ?? "News App"}</title>
      </Head>

      <motion.div
        style={{ display: "flex", flexDirection: "column", flex: 1 }}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Flex direction="column" w="100%" maxW="600px" mx="auto" px={["1", null]}>
          {/* Back button */}
          <NextLink href="/" passHref>
            <Link _hover={{ textDecoration: "none" }}>
              <Button
                leftIcon={<ArrowBackIcon size="24" />}
                colorScheme="blue"
                variant="ghost"
                pl="2"
              >
                Go Back
              </Button>
            </Link>
          </NextLink>

          {article ? (
            <>
              <Heading
                fontWeight="semibold"
                fontSize={["2xl", "3xl"]}
                pb="2"
                mt="2"
                borderBottom="1px solid black"
              >
                {article.title}
              </Heading>

              <Box fontSize="sm" color="#666" mt="2">
                <Text>
                  Published on{" "}
                  {dayjs(article.published, "YYYY-MM-DD HH:mm:ss ZZ").format(
                    "MMMM D YYYY, h:mm A"
                  )}
                </Text>
                {article.author && (
                  <Text>
                    by <Span color="black">{article.author}</Span>
                  </Text>
                )}
              </Box>

              <Box w="100%" h="auto" mt="4" pb="4" borderBottom="1px solid black">
                <Image
                  data-src={article.image}
                  w="100%"
                  h="100%"
                  objectFit="contain"
                  className="lazyload"
                />
                <Skeleton height="300px" />
              </Box>

              <Text
                mt="4"
                fontFamily="'Libre Baskerville', serif"
                lineHeight="1.8"
                fontWeight="medium"
              >
                {article.description}
                <Link
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="blue"
                  textDecoration="underline"
                >
                  Read More
                </Link>
              </Text>

              <Text mt="20" mb="4" fontWeight="semibold" borderBottom="1px solid black">
                {article.comments.length}{" "}
                {article.comments.length === 1 ? "Comment" : "Comments"}
              </Text>

              <AddComment slug={article.id} />
              <Comments comments={article.comments} />
            </>
          ) : news.articles.length === 0 ? (
            <LoadingArticle />
          ) : (
            slug && <ArticleNotFound />
          )}
        </Flex>
      </motion.div>
    </>
  );
});

export default ArticlePage;
