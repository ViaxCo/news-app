import { getFirebaseClient } from "../utils/firebase";
import { ArticleType } from "./NewsStore";

const addCommentToDb = async (article: ArticleType, comment: string, slug: string) => {
  const firebase = await getFirebaseClient();
  const firestore = firebase.firestore();
  const articlesRef = firestore.collection("articles");

  // Add new comment to the database
  await articlesRef.doc(slug).set({
    ...article,
    comments: [
      { text: comment, createdAt: firebase.firestore.Timestamp.now() },
      ...article.comments,
    ],
  });
  // Fetch updates articles and save to state
  const querySnapshot = await articlesRef.orderBy("published", "desc").get();
  return querySnapshot;
};

export default addCommentToDb;
