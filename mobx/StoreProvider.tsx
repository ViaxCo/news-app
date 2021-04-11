import { createContext, ReactNode, useContext } from "react";
import { ArticleType, NewsStore, NewsType } from "./NewsStore";

export type FetchedData = {
  articles: ArticleType[];
};

export const StoreContext = createContext<NewsStore | undefined>(undefined);

// Custom hook to consume store within components wrapped with Provider
export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within StoreProvider");
  }

  return context;
};

export const StoreProvider = ({
  children,
  fetchedData,
}: {
  children: ReactNode;
  fetchedData: FetchedData;
}) => {
  const store = initializeNewsStore(fetchedData);

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export let newsStore: NewsType;
export const initializeNewsStore = (fetchedData: FetchedData | null = null) => {
  // If on client, newsStore would be defined, else, create new store
  const _store = newsStore ?? new NewsStore();

  // getInitialProps called within _app returns fetchedData that will be used to hydrate the store
  if (fetchedData) {
    _store.hydrate(fetchedData);
  }
  // For SSR, always create a new store
  if (typeof window === "undefined") return _store;

  // Create the store once in the client
  if (!newsStore) newsStore = _store;

  return _store;
};
