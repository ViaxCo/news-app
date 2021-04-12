import axios from "axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import kebabCase from "lodash/kebabCase";
import { getFirebaseClient } from "../utils/firebase";
import { ArticleType, CommentType } from "./NewsStore";

dayjs.extend(customParseFormat);

const fetchNewsAndSaveToDB = async () => {
  const firebase = await getFirebaseClient();
  const db = firebase.database();

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

    const snapshot = await db.ref("articles").get();
    const articles: ArticleType[] = snapshot.val();
    const articleIds = articles.map(a => a.id);
    // If there's any new article fetched from the api, add it to the articles from the db
    kebabCaseTitledNews.forEach(article => {
      if (!articleIds.includes(article.id)) {
        articles.unshift(article);
      }
    });
    await db.ref("articles").set(articles);

    // Sort by published descending
    const sortedArticles = articles.sort((a, b) =>
      dayjs(b.published, "YYYY-MM-DD HH:mm:ss ZZ").isAfter(
        dayjs(a.published, "YYYY-MM-DD HH:mm:ss ZZ")
      )
        ? 1
        : -1
    );

    // Fetch Comments
    const snapshot2 = await db.ref("comments").get();
    const comments: CommentType[] = snapshot2.val();

    return { articles: sortedArticles, comments };
  } catch (error) {
    console.log(error);
  }
};

export default fetchNewsAndSaveToDB;
