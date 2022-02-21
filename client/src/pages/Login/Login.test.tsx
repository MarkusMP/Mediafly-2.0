import Login from "./Login";
import { render, screen } from "../../tests/test-utils";

test("should render login component", () => {
  render(<Login />);
  const register = screen.getByRole("heading", { name: /login/i });

  const email = screen.getByRole("textbox", { name: /email/i });
  const password = screen.getByLabelText(/password/i);

  expect(email).toBeInTheDocument();
  expect(password).toBeInTheDocument();
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
