import type { ArticleType } from "@/mobx/NewsStore";
import { Grid } from "@chakra-ui/layout";
import ArticleCard from "./ArticleCard";

type Props = {
  articles: ArticleType[];
};

const Articles = ({ articles }: Props) => {
  return (
    <Grid
      templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
      placeItems="center"
      placeContent="center"
      gap="4"
      mt="4"
    >
      {articles.map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </Grid>
  );
};

export default Articles;
