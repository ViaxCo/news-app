import { Grid } from "@chakra-ui/layout";
import type { Article } from "./ArticleCard";
import ArticleCard from "./ArticleCard";

type Props = {
  articles: Article[];
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
      {articles.map((article, index) => (
        <ArticleCard key={article.id} article={article} index={index} />
      ))}
    </Grid>
  );
};

export default Articles;
