import { db } from "@/utils/firebase";
import axios from "axios";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import kebabCase from "lodash/kebabCase";
import type { ArticleType } from "./NewsStore";

const fetchNewsAndSaveToDB = async () => {
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

    filteredNews.forEach(async article => {
      const slug = kebabCase(article.title);
      try {
        // Check if the article already exists in the db
        const articleRef = doc(db, "articles", slug);
        const articleSnapshot = await getDoc(articleRef);

        // If there's any new article fetched from the api, add it to the articles from the db
        if (!articleSnapshot.exists()) {
          await setDoc(doc(db, "articles", slug), {
            ...article,
            id: slug,
            comments: [],
          });
        }
      } catch (error) {
        // TODO: Do something here
        console.log(error);
      }
    });

    return await getArticlesFromDB();
  } catch (error) {
    console.log(error);
    return await getArticlesFromDB();
  }
};

const getArticlesFromDB = async () => {
  // Fetch all the articles from db
  const articlesQuery = query(collection(db, "articles"), orderBy("published", "desc"));
  const articlesSnapshot = await getDocs(articlesQuery);
  const articles = articlesSnapshot.docs.map(doc => doc.data());
  return articles as ArticleType[];
};

export default fetchNewsAndSaveToDB;
