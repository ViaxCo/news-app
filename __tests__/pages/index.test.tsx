import { render } from "@testing-library/react";
import Home from "../../pages/index";

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
    render(<Home />);
    const h1 = document.querySelector("h1");
    const articles = document.querySelectorAll("article");
    expect(h1).toBeInTheDocument();
    expect(h1?.textContent).toBe("News App");
    expect(articles.length).toBe(20);
  });
});
