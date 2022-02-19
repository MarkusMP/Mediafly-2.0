import Message from "./Message";
import { render, screen, waitFor } from "../../tests/test-utils";

test("if message prop is empty then component should be empty", () => {
  const message = "";
  const { container } = render(<Message message={message} />);
  expect(container.firstChild).toBeNull();
});

test("if message prop is not empty should render component", () => {
  const message = "test";
  render(<Message message={message} />);

  const messageElement = screen.getByText(message);

  expect(messageElement).toBeInTheDocument();
});

test("message component shoud be empty after 3 seconds", () => {
  const message = "test";
  const { unmount } = render(<Message message={message} />);

  const messageElement = screen.getByText(message);

  expect(messageElement).toBeInTheDocument();

  unmount();

  expect(messageElement).not.toBeInTheDocument();
});
