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
    const h2 = document.querySelector("h2");
    const articles = document.querySelectorAll("article");
    expect(h2).toBeInTheDocument();
    expect(h2?.textContent).toBe("Articles");
    expect(articles.length).toBe(20);
  });
});
