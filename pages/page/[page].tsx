import { Article, ArticleFromApi } from "@/components/ArticleCard";
import Articles from "@/components/Articles";
import Pagination from "@/components/Pagination";
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
    <div className="flex flex-col flex-1">
      <div className="border-b-2 border-solid border-black flex items-center justify-between">
        <h2 className="ml-2 text-2xl sm:text-3xl font-semibold">Articles</h2>
        <p className="mr-2 text-sm text-grey">Page {page}</p>
      </div>
      <Articles articles={articles} />
      <Pagination currentPage={+page!} totalPages={totalPages} />
    </div>
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
