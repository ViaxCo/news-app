import { Grid } from "@chakra-ui/layout";
import { ArticleType } from "../mobx/NewsStore";
import ArticleCard from "./ArticleCard";
import LoadingCard from "./LoadingCard";

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
      {/* If array is empty, populate with loading content */}
      {articles.length === 0
        ? Array(20)
            .fill("")
            .map((_, i) => <LoadingCard key={i} />)
        : articles.map(article => <ArticleCard key={article.id} article={article} />)}
    </Grid>
  );
};

export default Articles;
