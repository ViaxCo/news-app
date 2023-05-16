import type { Article } from "./ArticleCard";
import ArticleCard from "./ArticleCard";

type Props = {
  articles: Article[];
};

const Articles = ({ articles }: Props) => {
  return (
    <div className="grid grid-cols-articles place-items-center place-content-center gap-4 mt-4">
      {articles.map((article, index) => (
        <ArticleCard key={article.id} article={article} index={index} />
      ))}
    </div>
  );
};

export default Articles;
