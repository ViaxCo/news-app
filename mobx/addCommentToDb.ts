import { commentsRef } from "@/utils/firebase";
import Filter from "bad-words";
import { get, serverTimestamp, set } from "firebase/database";

const addCommentToDb = async (comment: string, slug: string) => {
  try {
    const commentsSnapshot = await get(commentsRef);
    const comments = commentsSnapshot.val();
    const filter = new Filter();
    const cleanedComment = filter.clean(comment);
    await set(commentsRef, [
      ...comments,
      {
        articleId: slug,
        text: cleanedComment,
        createdAt: serverTimestamp(),
      },
    ]);
    const commentsSnapshot2 = await get(commentsRef);
    const newComments = commentsSnapshot2.val();
    return newComments;
  } catch (error) {
    // TODO: Do something meaningful here
    console.log(error);
  }
};

export default addCommentToDb;
