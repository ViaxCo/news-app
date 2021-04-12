jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "/",
      query: "",
      asPath: "",
    };
  },
}));
import { render } from "@testing-library/react";
import { nanoid } from "nanoid";
import { StoreProvider } from "../../mobx/StoreProvider";
import Home from "../../pages/index";

const mockArticle = {
  id: "string",
  title: "string",
  description: "string",
  url: "string",
  author: "string",
  image: "string",
  published: "string",
  comments: [],
};

const mockArticles = Array(20)
  .fill("")
  .map(item => ({ ...mockArticle, id: nanoid(32) }));

describe("Home", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    window.scrollTo = jest.fn();
  });
  it("renders without crashing", () => {
    render(
      <StoreProvider fetchedData={{ articles: mockArticles }}>
        <Home />
      </StoreProvider>
    );
    const h2 = document.querySelector("h2");
    const articles = document.querySelectorAll("article");
    expect(h2).toBeInTheDocument();
    expect(h2?.textContent).toBe("Articles");
    expect(articles.length).toBe(20);
  });
});
