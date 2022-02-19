import Login from "./Login";
import { render, screen } from "../../tests/test-utils";

test("should render login component", () => {
  render(<Login />);
  const register = screen.getByRole("heading", { name: /login/i });

  expect(register).toBeInTheDocument();
});

test("Clicking Register should redirect to /register", () => {
  render(<Login />);
  const link = screen.getByRole("link", {
    name: /register/i,
  });

  link.click();

  expect(window.location.pathname).toBe("/register");
});
