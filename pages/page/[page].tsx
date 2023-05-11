import { Article } from "@/components/ArticleCard";
import Articles from "@/components/Articles";
import Pagination from "@/components/Pagination";
import fallbackImage from "@/public/fallback.jpg";
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
        `https://api.currentsapi.services/v1/search?apiKey=${process.env.API_KEY}&country=NG&page_number=${page}&page_size=20&domain_not=theguardian.com`
      );
      const articles = res.data.news as Article[];

      const articlesWithImages = articles.map(article =>
        article.image === "None" ? { ...article, image: fallbackImage } : article
      );

      return {
        props: {
          articles: articlesWithImages,
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
