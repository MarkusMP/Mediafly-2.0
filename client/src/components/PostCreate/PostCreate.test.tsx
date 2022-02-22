import PostCreate from "./PostCreate";
import { render, screen } from "../../tests/test-utils";

test("Should render PostCreate correctly", () => {
  render(<PostCreate />);
  const textarea = screen.getByRole("textbox", { name: /create post/i });
  const submitBtn = screen.getByRole("button", { name: /create post/i });
  const imageInput = screen.getByRole("textbox", {
    name: /post image \(optional\)/i,
  });

  expect(textarea).toBeInTheDocument();
  expect(submitBtn).toBeInTheDocument();
  expect(imageInput).toBeInTheDocument();
});
