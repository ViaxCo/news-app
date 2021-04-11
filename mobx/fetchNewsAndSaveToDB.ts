import axios from "axios";
import kebabCase from "lodash/kebabCase";
import { getFirebaseClient } from "../utils/firebase";
import { ArticleType } from "./NewsStore";

const fetchNewsAndSaveToDB = async () => {
  const firebase = await getFirebaseClient();
  const firestore = firebase.firestore();
  const articlesRef = firestore.collection("articles");

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
      // Check if the article already exists in the db
      const doc = await articlesRef.doc(slug).get();
      // If it doesn't, save it
      if (!doc.exists) {
        await articlesRef.doc(slug).set({
          ...article,
          id: slug,
          comments: [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
  // Fetch all the articles from db and save to state
  const querySnapshot = await articlesRef.orderBy("published", "desc").get();
  return querySnapshot;
};

export default fetchNewsAndSaveToDB;
