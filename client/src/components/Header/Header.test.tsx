import Header from "./Header";
import { render, screen } from "../../tests/test-utils";

test("Should open navigation when menu is pressed", () => {
  render(<Header />);
  const button = screen.getByRole("button");
  button.click();
  const ul = screen.getByRole("list");
  expect(ul).toHaveClass("open");
});

test("Should close navigation when menu is pressed", () => {
  render(<Header />);
  const button = screen.getByRole("button");
  button.click();
  const ul = screen.getByRole("list");
  button.click();
  expect(ul).toHaveClass("close");
});
