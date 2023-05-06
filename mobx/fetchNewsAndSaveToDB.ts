import { articlesRef, commentsRef } from "@/utils/firebase";
import axios from "axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { get, set } from "firebase/database";
import kebabCase from "lodash/kebabCase";
import type { ArticleType, CommentType } from "./NewsStore";

dayjs.extend(customParseFormat);

const fetchNewsAndSaveToDB = async () => {
  // Fetch Articles
  // TODO: implement `try catch` for these queries
  const articlesSnapshot = await get(articlesRef);
  const articles: ArticleType[] = articlesSnapshot.val();
  const articleIds = articles.map(a => a.id);

  // Fetch Comments
  const commentsSnapshot = await get(commentsRef);
  const comments: CommentType[] = commentsSnapshot.val();

  try {
    // Fetch news from Nigeria
    const res = await axios.get(
      `https://api.currentsapi.services/v1/search?apiKey=${process.env.API_KEY}&country=NG`
    );
    const news = res.data.news as ArticleType[];
    // Filter out articles with no image and long titles
    const filteredNews = news.filter(
      article => article.image !== "None" && article.title.length <= 120
    );
    // Turn all the ids to kebab-case
    const kebabCaseTitledNews = filteredNews.map(article => ({
      ...article,
      id: kebabCase(article.title),
    }));

    // If there's any new article fetched from the api, add it to the articles from the db
    kebabCaseTitledNews.forEach(article => {
      if (!articleIds.includes(article.id)) {
        articles.unshift(article);
      }
    });
    await set(articlesRef, articles);

    // Sort by published descending
    const sortedArticles = sortArticles(articles);

    return { articles: sortedArticles, comments };
  } catch (error) {
    console.log(error);
    const sortedArticles = sortArticles(articles);
    return { articles: sortedArticles, comments };
  }
};

function sortArticles(articles: ArticleType[]) {
  // Sort by published descending
  return articles.sort((a, b) =>
    dayjs(b.published, "YYYY-MM-DD HH:mm:ss ZZ").isAfter(
      dayjs(a.published, "YYYY-MM-DD HH:mm:ss ZZ")
    )
      ? 1
      : -1
  );
}
export default fetchNewsAndSaveToDB;
