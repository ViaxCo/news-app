import { makeAutoObservable } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";
import { FetchedData } from "./StoreProvider";
import addCommentToDb from "./addCommentToDb";
// there is no window object on the server
enableStaticRendering(typeof window === "undefined");

export type CommentType = {
  articleId: string;
  text: string;
  createdAt: number;
};

export type ArticleType = {
  id: string;
  title: string;
  description: string;
  url: string;
  author: string;
  image: string;
  published: string;
  comments: CommentType[];
};

export class NewsStore {
  articles: ArticleType[] = [];

  constructor() {
    makeAutoObservable(this);
  }
  addComment = async (comments: CommentType[], comment: string, slug: string) => {
    const found = this.articles.find(article => article.id === slug);
    if (!found) return;
    try {
      const newComments = await addCommentToDb(comments, comment, slug);
      this.articles = this.articles.map(article =>
        article.id === slug
          ? { ...article, comments: newComments ?? article.comments }
          : article
      );
    } catch (error) {
      // TODO: Do something meaningful here
      console.log(error);
    }
  };
  hydrate = (fetchedData: FetchedData) => {
    if (!fetchedData) return;
    this.articles = fetchedData.articles ?? [];
  };
}
