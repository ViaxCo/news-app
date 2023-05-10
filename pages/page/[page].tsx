import { Article } from "@/components/ArticleCard";
import Articles from "@/components/Articles";
import Pagination from "@/components/Pagination";
import { Flex, Heading, Text } from "@chakra-ui/layout";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

type Props = {
  articles: Article[];
};

const totalPages = 100;

const Page = ({ articles }: Props) => {
  const { query } = useRouter();
  const { page } = query;

  return (
    <Flex direction="column" flex={1}>
      <Flex borderBottom="2px solid black" align="center" justify="space-between">
        <Heading ml="2" fontSize={["2xl", "3xl"]} fontWeight="semibold">
          Articles
        </Heading>
        <Text mr="2" fontSize="small" color="#666">
          Page {page}
        </Text>
      </Flex>
      <Articles articles={articles} />
      <Pagination currentPage={+page!} totalPages={totalPages} />
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { params } = context;
  const page = Number(params?.page);
  if (page > 0 && page <= totalPages) {
    try {
      // Fetch news from Nigeria
      const res = await axios.get(
        `https://api.currentsapi.services/v1/search?apiKey=${process.env.API_KEY}&country=NG&page_number=${page}&page_size=20`
      );
      const articles = res.data.news as Article[];
      // TODO: Handle articles with no image and long titles
      // const filteredNews = articles.filter(
      //   article => article.image !== "None" && article.title.length <= 120
      // );

      return {
        props: {
          articles,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        notFound: true,
      };
    }
  } else {
    return {
      notFound: true,
    };
  }
};

export default Page;
