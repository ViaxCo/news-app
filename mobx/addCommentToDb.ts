import { db } from "@/utils/firebase";
import Filter from "bad-words";
import { serverTimestamp } from "firebase/database";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import type { ArticleType, CommentType } from "./NewsStore";

const addCommentToDb = async (comments: CommentType[], comment: string, slug: string) => {
  try {
    const filter = new Filter();
    const cleanedComment = filter.clean(comment);

    const articleRef = doc(db, "articles", slug);

    await updateDoc(articleRef, {
      comments: [
        {
          articleId: slug,
          text: cleanedComment,
          createdAt: serverTimestamp(),
        },
        ...comments,
      ],
    });

    const articleSnapshot = await getDoc(articleRef);

    if (articleSnapshot.exists()) {
      const article = articleSnapshot.data() as ArticleType;
      return article.comments;
    } else {
      return comments;
    }
  } catch (error) {
    // TODO: Do something meaningful here
    console.log(error);
    return comments;
  }
};

export default addCommentToDb;
