import { action, makeObservable, observable, runInAction } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";
import addCommentToDb from "./addCommentToDb";
import { FetchedData } from "./StoreProvider";
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
    makeObservable(this, {
      articles: observable,
      comments: observable,
      addComment: action,
      hydrate: action,
    });
  }
  addComment = async (comment: string, slug: string) => {
    const articles = this.articles;
    const article = articles.find(article => article.id === slug);
    if (!article) return;
    try {
      const comments = await addCommentToDb(comment, slug);
      runInAction(() => (this.comments = comments ?? this.comments));
    } catch (error) {
      console.log(error);
    }
  };
  hydrate = (fetchedData: FetchedData) => {
    if (!fetchedData) return;
    this.articles = fetchedData.news.articles ?? [];
    this.comments = fetchedData.news.comments ?? [];
  };
}
const news = new NewsStore();
export type NewsType = typeof news;
