import { Flex, Heading, Text } from "@chakra-ui/layout";
import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import Articles from "../components/Articles";
import Pagination from "../components/Pagination";
import { useStore } from "../mobx/StoreProvider";

const Home = observer(() => {
  const news = useStore();

  // Pagination details
  const articleCardsPerPage = 20;
  const totalPages = Math.ceil(news.articles.length / articleCardsPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentArticles, setCurrentArticles] = useState(news.articles.slice(0, 20));

  useEffect(() => {
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </motion.div>
  );
});

export default Home;
