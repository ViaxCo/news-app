import Filter from "bad-words";
import { getFirebaseClient } from "../utils/firebase";

const addCommentToDb = async (comment: string, slug: string) => {
  const firebase = await getFirebaseClient();
  const db = firebase.database();

  try {
    const snapshot = await db.ref("comments").get();
    const comments = snapshot.val();
    const filter = new Filter();
    const cleanedComment = filter.clean(comment);
    await db.ref("comments").set([
      ...comments,
      {
        articleId: slug,
        text: cleanedComment,
        createdAt: firebase.database.ServerValue.TIMESTAMP as number,
      },
    ]);
    const snapshot2 = await db.ref("comments").get();
    const newComments = snapshot2.val();
    return newComments;
  } catch (error) {
    console.log(error);
  }
};

export default addCommentToDb;
