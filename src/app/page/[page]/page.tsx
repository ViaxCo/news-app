import type { Article, ArticleFromApi } from "@/components/ArticleCard";
import Articles from "@/components/Articles";
import Pagination from "@/components/Pagination";
import { getPlaiceholder } from "plaiceholder";

const totalPages = 25;

export const dynamicParams = false;

export const generateStaticParams = async () => {
  const pages = Array.from({ length: totalPages }, (_, i) => (i + 1).toString());
  return pages.map(page => ({ page }));
};

const getArticles = async (page: string) => {
  try {
    // Fetch news from Nigeria
    const res = await fetch(
      `https://api.currentsapi.services/v1/search?apiKey=${process.env.API_KEY}&country=NG&page_number=${page}&page_size=20&domain_not=theguardian.com`,
      // revalidate every 3 hours
      { next: { revalidate: 10800 } }
    );
    const data = await res.json();
    const articles = data.news as ArticleFromApi[];

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

    return updatedArticles;
  } catch (error) {
    // TODO: Test the error by modifying any of the above `await's`
    console.error(error);
    return [];
  }
};

type Props = {
  params: { page: string };
};

const Page = async ({ params }: Props) => {
  const { page } = params;
  const articles = await getArticles(page);

  return (
    <div className="flex flex-col flex-1">
      <div className="border-b-2 border-solid border-black flex items-center justify-between">
        <h2 className="ml-2 text-2xl sm:text-3xl font-semibold">Articles</h2>
        <p className="mr-2 text-sm text-grey">Page {page}</p>
      </div>
      <Articles articles={articles} />
      <Pagination currentPage={+page} totalPages={totalPages} />
    </div>
  );
};

export default Page;
