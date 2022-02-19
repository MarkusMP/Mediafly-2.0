import Register from "./Register";
import { render, screen } from "../../tests/test-utils";

test("should render register component", () => {
  render(<Register />);
  const register = screen.getByRole("heading", { name: /register/i });

  expect(register).toBeInTheDocument();
});

test("Clicking login should redirect to /login", async () => {
  render(<Register />);

  const link = screen.getByRole("link", {
    name: /login/i,
  });

  link.click();

  expect(window.location.pathname).toBe("/login");
});
