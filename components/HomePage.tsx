import { Flex, Heading, Text } from "@chakra-ui/layout";
import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useStore } from "../mobx/StoreProvider";
import Articles from "./Articles";
import NotFound from "./NotFound";
import Pagination from "./Pagination";

const HomePage = observer(() => {
  const { pathname, query } = useRouter();
  const { page } = query;

  const news = useStore();

  // Pagination details
  const articleCardsPerPage = 20;
  const totalPages = Math.ceil(news.articles.length / articleCardsPerPage);

  const currentPage = pathname === "/" ? 1 : +page!;
  const indexOfLastArticleCard = currentPage * articleCardsPerPage;
  const indexOfFirstArticleCard = indexOfLastArticleCard - articleCardsPerPage;
  const currentArticles = news.articles.slice(
    indexOfFirstArticleCard,
    indexOfLastArticleCard
  );

  return pathname === "/" || inRange(page!, 1, totalPages) ? (
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
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </motion.div>
  ) : (
    <NotFound param="page" />
  );
});

export default HomePage;

const inRange = (number: string | string[], start: number, end: number) => {
  if (Array.isArray(number)) return;
  if (!Number.isInteger(parseFloat(number))) return;
  return (
    parseInt(number) >= Math.min(start, end) && parseInt(number) <= Math.max(start, end)
  );
};
