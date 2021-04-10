import { Button } from "@chakra-ui/button";
import { Flex, Heading, HStack, Text } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import Articles from "../components/Articles";
import news, { ArticleType } from "../mobx/NewsStore";

// Custom span component with chakra props
const Span = chakra("span");

const Home = observer(() => {
  // Pagination details
  const articleCardsPerPage = 20;
  const totalPages = Math.ceil(news.articles.length / articleCardsPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentArticles, setCurrentArticles] = useState<ArticleType[]>(
    news.articles.length === 0 ? [] : news.articles.slice(0, 20)
  );

  useEffect(() => {
    // Fetch news if array is empty (i.e on reload/first load)
    if (news.articles.length === 0) news.fetchArticles();
    // Pagination details
    const indexOfLastArticleCard = currentPage * articleCardsPerPage;
    const indexOfFirstArticleCard = indexOfLastArticleCard - articleCardsPerPage;
    setCurrentArticles(
      news.articles.slice(indexOfFirstArticleCard, indexOfLastArticleCard)
    );
    window.scrollTo(0, 0);
  }, [currentPage, news.articles.length]);

  return (
    <motion.div
      style={{ display: "flex", flexDirection: "column", flex: 1 }}
      variants={{
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Flex borderBottom="2px solid black" align="center" justify="space-between">
        <Heading ml="2" fontSize={["2xl", "3xl"]} fontWeight="semibold">
          Articles
        </Heading>
        <Text mr="2" fontSize="small" color="#666">
          Page {currentPage}
        </Text>
      </Flex>
      <Articles articles={currentArticles} />
      {/* Pagination */}
      <HStack alignSelf="center" mt="6" spacing="6">
        <Button
          size="sm"
          fontWeight="bold"
          fontSize="lg"
          onClick={() => setCurrentPage(prev => prev - 1)}
          colorScheme="blue"
          disabled={currentPage === 1}
        >
          &lt;
        </Button>
        <Text>
          Page <Span fontWeight="semibold">{currentPage}</Span> of{" "}
          <Span fontWeight="semibold">{totalPages ? totalPages : 1}</Span>
        </Text>
        <Button
          size="sm"
          fontWeight="bold"
          fontSize="lg"
          colorScheme="blue"
          onClick={() => setCurrentPage(prev => prev + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </Button>
      </HStack>
    </motion.div>
  );
});

export default Home;
