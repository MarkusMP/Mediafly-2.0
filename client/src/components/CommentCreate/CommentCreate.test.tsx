import { render, screen } from "../../tests/test-utils";
import CommentCreate from "./CommentCreate";

test("should render component correctly", () => {
  render(<CommentCreate postId="postId" />);

  const inputElement = screen.getByPlaceholderText("Comment Something...");

  const btn = screen.getByRole("button", {
    name: /create comment/i,
  });

  expect(inputElement).toBeInTheDocument();
  expect(btn).toBeInTheDocument();
});
