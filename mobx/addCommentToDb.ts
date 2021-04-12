import Filter from "bad-words";
import { getFirebaseClient } from "../utils/firebase";
import { ArticleType } from "./NewsStore";

const addCommentToDb = async (article: ArticleType, comment: string, slug: string) => {
  const firebase = await getFirebaseClient();
  const firestore = firebase.firestore();
  const articlesRef = firestore.collection("articles");

  const filter = new Filter();
  const cleanedComment = filter.clean(comment);
  // Add new comment to the database
  await articlesRef.doc(slug).set({
    ...article,
    comments: [
      { text: cleanedComment, createdAt: firebase.firestore.Timestamp.now() },
      ...article.comments,
    ],
  });
  // Fetch updated articles
  const querySnapshot = await articlesRef.orderBy("published", "desc").get();
  return querySnapshot;
};

export default addCommentToDb;
