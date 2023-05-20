import Articles from "@/components/Articles";
import ErrorComponent from "@/components/ErrorComponent";
import Pagination from "@/components/Pagination";
import getArticles from "@/utils/getArticles";
import { notFound } from "next/navigation";

const totalPages = 25;

export const generateStaticParams = async () => {
  const pages = Array.from({ length: totalPages }, (_, i) => (i + 1).toString());
  return pages.map(page => ({ page }));
};

type Props = {
  params: { page: string };
};

const Page = async ({ params }: Props) => {
  const { page } = params;

  const pageNum = Number(params.page);
  const inRange = pageNum > 0 && pageNum <= totalPages;
  if (!inRange) notFound();

  const articles = await getArticles(page);

  return (
    <div className="flex flex-col flex-1">
      <div className="border-b-2 border-solid border-black flex items-center justify-between">
        <h2 className="ml-2 text-2xl sm:text-3xl font-semibold">Articles</h2>
        <p className="mr-2 text-sm text-grey">Page {page}</p>
      </div>
      {articles.length > 0 ? <Articles articles={articles} /> : <ErrorComponent />}
      <Pagination currentPage={+page} totalPages={totalPages} />
    </div>
  );
};

export default Page;
