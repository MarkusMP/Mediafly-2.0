import Register from "./Register";
import { render, screen } from "../../tests/test-utils";

test("should render register component", () => {
  render(<Register />);
  const register = screen.getByRole("heading", { name: /register/i });
  const email = screen.getByRole("textbox", { name: /email/i });
  const password = screen.getByLabelText(/password/i);
  const firstName = screen.getByRole("textbox", {
    name: /first name \(optional\)/i,
  });
  const lastName = screen.getByRole("textbox", {
    name: /last name \(optional\)/i,
  });
  const bio = screen.getByRole("textbox", { name: /bio \(optional\)/i });
  const profile_image = screen.getByRole("textbox", {
    name: /choose a profile image \(optional\)/i,
  });
  const btnRegister = screen.getByRole("button", { name: /register/i });

  expect(email).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(firstName).toBeInTheDocument();
  expect(lastName).toBeInTheDocument();
  expect(bio).toBeInTheDocument();
  expect(profile_image).toBeInTheDocument();
  expect(btnRegister).toBeInTheDocument();

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
