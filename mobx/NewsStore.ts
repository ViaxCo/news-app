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
};

export class NewsStore {
  articles: ArticleType[] = [];
  comments: CommentType[] = [];

  constructor() {
    makeAutoObservable(this);
  }
  addComment = async (comment: string, slug: string) => {
    const articles = this.articles;
    const article = articles.find(article => article.id === slug);
    if (!article) return;
    try {
      const comments = await addCommentToDb(comment, slug);
      this.comments = comments ?? this.comments;
    } catch (error) {
      // TODO: Do something meaningful here
      console.log(error);
    }
  };
  hydrate = (fetchedData: FetchedData) => {
    if (!fetchedData) return;
    this.articles = fetchedData.news.articles ?? [];
    this.comments = fetchedData.news.comments ?? [];
  };
}
