import axios from "axios";
import kebabCase from "lodash/kebabCase";
import { getFirebaseClient } from "../utils/firebase";
import { ArticleType } from "./NewsStore";

const fetchNewsAndSaveToDB = async () => {
  const firebase = await getFirebaseClient();
  const firestore = firebase.firestore();
  const articlesRef = firestore.collection("articles");

  try {
    // Fetch news from Nigeria
    const res = await axios.get(
      `https://api.currentsapi.services/v1/search?apiKey=${process.env.API_KEY}&country=NG`
    );
    const news = res.data.news as ArticleType[];
    // Filter out articles with no image and long titles
    const filteredNews = news.filter(
      article => article.image !== "None" && article.title.length <= 140
    );
    filteredNews.forEach(async article => {
      const slug = kebabCase(article.title);
      try {
        // Create if it doesn't exist, and if it exists, only replace the "id" field (to avoid overwriting comments with empty array)
        await articlesRef.doc(slug).set(
          {
            ...article,
            id: slug,
            comments: [],
          },
          { mergeFields: ["id"] }
        );
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }

  // Fetch all the articles from db
  const querySnapshot = await articlesRef.orderBy("published", "desc").get();
  return querySnapshot;
};

export default fetchNewsAndSaveToDB;
