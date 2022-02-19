import Back from "./Back";
import { render, screen } from "../../tests/test-utils";

test("should redirect to previous page when (Go Back) button is clicked", () => {
  render(<Back />);
  const button = screen.getByRole("button");
  button.click();
  expect(window.location.pathname).toBe("/");
});
