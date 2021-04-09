import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { chakra } from "@chakra-ui/system";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { BsArrowLeftShort as ArrowBackIcon } from "react-icons/bs";
import AddComment from "../../components/AddComment";
import ArticleNotFound from "../../components/ArticleNotFound";
import Comments from "../../components/Comments";
import Container from "../../components/Container";
import LoadingArticle from "../../components/LoadingArticle";
import news from "../../mobx/NewsStore";

// Custom span component with chakra props
const Span = chakra("span");

const ArticlePage = observer(() => {
  const { query } = useRouter();
  const { slug } = query;
  const article = news.articles.find(article => article.id === slug);

  useEffect(() => {
    // Fetch news if array is empty (i.e on reload/first load)
    if (news.articles.length === 0) news.fetchArticles();
  }, []);

  return (
    <Container>
      <Head>
        <title>{article?.title ?? "News App"}</title>
      </Head>

      <Flex direction="column" w="100%" maxW="600px" mx="auto" px={["1", null]}>
        {/* Back button */}
        <NextLink href="/" passHref>
          <Link _hover={{ textDecoration: "none" }}>
            <Button
              leftIcon={<ArrowBackIcon size="24" />}
              colorScheme="blue"
              variant="ghost"
              px="2"
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
              {article?.title}
            </Heading>

            <Box fontSize="sm" color="#666" mt="2">
              <Text>
                Published on{" "}
                {dayjs(article?.published, "YYYY-MM-DD HH:mm:ss ZZ").format(
                  "MMMM D YYYY, h:mm A"
                )}
              </Text>
              {article?.author && (
                <Text>
                  by <Span color="black">{article?.author}</Span>
                </Text>
              )}
            </Box>

            <Box w="100%" h="auto" mt="4" pb="4" borderBottom="1px solid black">
              <Image
                data-src={article?.image}
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
              {article?.description}
              <Link
                href={article?.url}
                target="_blank"
                rel="noopener noreferrer"
                color="blue"
                textDecoration="underline"
              >
                Read More
              </Link>
            </Text>

            <Text mt="20" mb="4" fontWeight="semibold" borderBottom="1px solid black">
              {article?.comments.length}{" "}
              {article?.comments.length === 1 ? "Comment" : "Comments"}
            </Text>

            <AddComment slug={article?.id} />
            <Comments comments={article?.comments} />
          </>
        ) : news.articles.length > 0 ? (
          <ArticleNotFound />
        ) : (
          <LoadingArticle />
        )}
      </Flex>
    </Container>
  );
});

export default ArticlePage;
