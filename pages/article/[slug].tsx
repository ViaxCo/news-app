import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Flex, FlexProps, Heading, Link, Text } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { chakra } from "@chakra-ui/system";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { HTMLMotionProps, motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { BsArrowLeftShort as ArrowBackIcon } from "react-icons/bs";
import AddComment from "../../components/AddComment";
import { MotionBox } from "../../components/ArticleCard";
import Comments from "../../components/Comments";
import Meta from "../../components/Meta";
import NotFound from "../../components/NotFound";
import { useStore } from "../../mobx/StoreProvider";

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
// Custom Flex component with motion props
type Merge<P, T> = Omit<P, keyof T> & T;
type MotionFlexProps = Merge<FlexProps, HTMLMotionProps<"div">>;
const MotionFlex: React.FC<MotionFlexProps> = motion(Flex);

dayjs.extend(customParseFormat);

const ArticlePage = observer(() => {
  const router = useRouter();
  const { slug } = router.query;

  const news = useStore();
  const article = news.articles.find(article => article.id === slug);
  const comments = news.comments.filter(com => com.articleId === article?.id);
  const sortedComments = comments.sort((a, b) =>
    dayjs(b.createdAt).isAfter(dayjs(a.createdAt)) ? 1 : -1
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Meta
        title={article?.title}
        description={article?.description}
        image={article?.image}
        twitterCard="summary_large_image"
        name="article"
      />

      <MotionFlex
        flex="1"
        direction="column"
        w="100%"
        maxW="600px"
        mx="auto"
        px={["1", null]}
        // animation
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Back button */}
        <Button
          alignSelf="flex-start"
          leftIcon={<ArrowBackIcon size="24" />}
          colorScheme="blue"
          variant="ghost"
          pl="2"
          onClick={() => router.back()}
        >
          Go Back
        </Button>

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

            <MotionBox
              w="100%"
              h="auto"
              mt="4"
              pb="4"
              borderBottom="1px solid black"
              display="grid"
              gridTemplate="1fr / 1fr"
              placeItems="center"
              sx={{
                "& > *": {
                  gridColumn: "1 / 1",
                  gridRow: "1 / 1",
                },
              }}
              // animation
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.5 } }}
            >
              <Image
                data-src={article.image}
                alt={article.image.split("/").pop()}
                w="100%"
                objectFit="contain"
                className="lazyload"
                zIndex="1"
              />
              <Skeleton height="300px" width="100%" zIndex="2" />
            </MotionBox>

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
              {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
            </Text>

            <AddComment slug={article.id} />
            <Comments comments={sortedComments} />
          </>
        ) : (
          <NotFound param="article" />
        )}
      </MotionFlex>
    </>
  );
});

export default ArticlePage;
