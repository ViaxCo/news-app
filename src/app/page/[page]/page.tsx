import Articles from "@/components/Articles";
import Pagination from "@/components/Pagination";
import getArticles from "@/utils/getArticles";

const totalPages = 25;

export const dynamicParams = false;

export const generateStaticParams = async () => {
  const pages = Array.from({ length: totalPages }, (_, i) => (i + 1).toString());
  return pages.map(page => ({ page }));
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
