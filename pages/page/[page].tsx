import { Article } from "@/components/ArticleCard";
import Articles from "@/components/Articles";
import Pagination from "@/components/Pagination";
import { Flex, Heading, Text } from "@chakra-ui/layout";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

type Props = {
  articles: Article[];
};

const totalPages = 50;

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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { page: "1" } },
      { params: { page: "2" } },
      { params: { page: "49" } },
      { params: { page: "50" } },
    ],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const { params } = context;
  const page = Number(params?.page);
  if (page > 0 && page <= totalPages) {
    try {
      // Fetch news from Nigeria
      const res = await axios.get(
        `https://api.currentsapi.services/v1/search?apiKey=${process.env.API_KEY}&country=NG&page_number=${page}&page_size=20&domain_not=theguardian.com`
      );
      const articles = res.data.news as Article[];

      return {
        props: {
          articles,
        },
        // revalidate every 3 hours
        revalidate: 10800,
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
