import { Article, ArticleFromApi } from "@/components/ArticleCard";
import Articles from "@/components/Articles";
import Pagination from "@/components/Pagination";
import { Flex, Heading, Text } from "@chakra-ui/layout";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { getPlaiceholder } from "plaiceholder";

type Props = {
  articles: Article[];
};

const totalPages = 25;

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
  const pages = Array.from({ length: totalPages }, (_, i) => (i + 1).toString());
  const paths = pages.map(page => ({
    params: { page },
  }));

  return {
    paths,
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
      const articles = res.data.news as ArticleFromApi[];

      // Transform images to use a placeholder image
      const imagesProps = await Promise.all(
        articles.map(async article => {
          try {
            const { base64 } = await getPlaiceholder(
              article.image === "None" ? "/fallback.jpg" : article.image
            );
            return {
              src: article.image,
              base64,
            };
          } catch (error) {
            // Incase plaiceholder fails to transform the image, return the placeholder based on the fallback image
            const { base64 } = await getPlaiceholder("/fallback.jpg");
            console.error({ error, image: article.image, title: article.title, page });
            return {
              src: article.image,
              base64,
            };
          }
        })
      );

      const updatedArticles: Article[] = articles.map((article, index) => ({
        ...article,
        image: imagesProps[index],
      }));

      return {
        props: {
          articles: updatedArticles,
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
