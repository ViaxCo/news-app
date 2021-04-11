import { action, makeObservable, observable, runInAction } from "mobx";
import addCommentToDb from "./addCommentToDb";
import fetchNewsAndSaveToDB from "./fetchNewsAndSaveToDB";

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

class News {
  articles: ArticleType[] = [];

  constructor() {
    makeObservable(this, {
      articles: observable,
      fetchArticles: action,
      addComment: action,
    });
  }
  fetchArticles = async () => {
    try {
      const newsSnapshot = await fetchNewsAndSaveToDB();
      const articles = newsSnapshot.docs.map(doc => doc.data());
      runInAction(() => (this.articles = articles as ArticleType[]));
    } catch (error) {
      console.log(error);
    }
  };
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
}
const news = new News();
export default news;
