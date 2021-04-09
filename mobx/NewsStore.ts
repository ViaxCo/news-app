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
      const news = await fetchNewsAndSaveToDB();
      runInAction(() =>
        news.forEach(article => this.articles.push(article.data() as ArticleType))
      );
    } catch (error) {
      console.log(error);
    }
  };
  addComment = async (comment: string, slug: string) => {
    const articles = this.articles;
    const article = articles.find(article => article.id === slug);
    if (!article) return;
    try {
      const news = await addCommentToDb(article, comment, slug);
      runInAction(() =>
        news.forEach(item => {
          const article = item.data() as ArticleType;
          if (article.id === slug) {
            this.articles = articles.map(a =>
              a.id === slug ? { ...a, comments: article.comments } : a
            );
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
}
const news = new News();
export default news;
