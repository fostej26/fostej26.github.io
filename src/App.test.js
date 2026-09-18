import { render, screen } from "@testing-library/react";
import App from "./App";

beforeAll(() => {
  // jsdom lacks IntersectionObserver and matchMedia, which the page uses for
  // scroll reveals and reduced-motion checks.
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  window.matchMedia = () => ({ matches: true, addListener() {}, removeListener() {} });
});

test("renders the hero banner and main sections", () => {
  render(<App />);
  expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  expect(screen.getByText("Video Decoding Software Engineer Co-op")).toBeInTheDocument();
  expect(screen.getByText("AllergyPal")).toBeInTheDocument();
  expect(screen.getByText("fostej26@mcmaster.ca")).toBeInTheDocument();
});
