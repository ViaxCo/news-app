import { action, makeObservable, observable, runInAction } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";
import addCommentToDb from "./addCommentToDb";
import { FetchedData } from "./StoreProvider";
// there is no window object on the server
enableStaticRendering(typeof window === "undefined");

export type CommentType = {
  text: string;
  createdAt: { seconds: number; nanoseconds: number };
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
    makeObservable(this, {
      articles: observable,
      addComment: action,
      hydrate: action,
    });
  }
  addComment = async (comment: string, slug: string) => {
    const articles = this.articles;
    const article = articles.find(article => article.id === slug);
    if (!article) return;
    try {
      const newsSnapshot = await addCommentToDb(article, comment, slug);
      const articles = newsSnapshot.docs.map(doc => doc.data());
      runInAction(() => (this.articles = articles as ArticleType[]));
    } catch (error) {
      console.log(error);
    }
  };
  hydrate = (fetchedData: FetchedData) => {
    if (!fetchedData) return;
    this.articles = fetchedData.articles ?? [];
  };
}
const news = new NewsStore();
export type NewsType = typeof news;
