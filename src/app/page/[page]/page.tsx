import type { Article } from "@/components/ArticleCard";
import Articles from "@/components/Articles";
import Pagination from "@/components/Pagination";
import type { IGetPlaiceholderReturn } from "plaiceholder";
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
    const articles = data.news as Article[];

    // base64 placeholder of the fallback image in /public
    const fallbackBase64 =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAANElEQVR4nB3BoREAMAgDQAwDMAtTMWh8ND4+HtO7/gcAfwDCdlVl5t2FpJnpbttBcnclkXxmJSGykN3v2wAAAABJRU5ErkJggg==";

    // Transform images to use a placeholder image
    const imagesProps = await Promise.allSettled(
      articles.map(article =>
        // Return the placholder promise if it resolves within 5 seconds, if not reject
        Promise.race([getPlaiceholder(article.image), rejectPromiseAfterDelay(5000)])
      )
    );

    const articlesWithPlaceholder: Article[] = articles.map((article, index) => {
      const item = imagesProps[index];
      if (item.status === "fulfilled") {
        return { ...article, base64: item.value.base64 };
      } else {
        console.log({
          error: item.reason,
          title: article.title,
          image: article.image,
          type: "getPlaiceholder error",
          page,
        });
        return { ...article, base64: fallbackBase64 };
      }
    });

    return articlesWithPlaceholder;
  } catch (error) {
    // TODO: Test the error by modifying any of the above `await's`
    console.error({ error, type: "Either fetch or Promise.all failed" });
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
    <>
      <Articles articles={articles} />
      <Pagination currentPage={+page} totalPages={totalPages} />
    </>
  );
};

export default Page;

const rejectPromiseAfterDelay = (ms: number) =>
  new Promise<IGetPlaiceholderReturn>((_, reject) => {
    setTimeout(reject, ms, new Error("timeout"));
  });
