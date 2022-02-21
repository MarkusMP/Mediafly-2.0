import ProfileUpdate from "./ProfileUpdate";
import { render, screen } from "../../tests/test-utils";

test("should render register component", () => {
  render(<ProfileUpdate />);

  const heading = screen.getByRole("heading", {
    name: /update profile/i,
  });

  const username = screen.getByRole("textbox", {
    name: /username/i,
  });
  const firstName = screen.getByRole("textbox", {
    name: /first name/i,
  });
  const lastName = screen.getByRole("textbox", {
    name: /last name/i,
  });
  const bio = screen.getByRole("textbox", {
    name: /bio/i,
  });
  const profile_image = screen.getByRole("textbox", {
    name: /profile image/i,
  });
  const submit = screen.getByRole("button", {
    name: /update/i,
  });
  expect(heading).toBeInTheDocument();
  expect(username).toBeInTheDocument();
  expect(firstName).toBeInTheDocument();
  expect(lastName).toBeInTheDocument();
  expect(bio).toBeInTheDocument();
  expect(profile_image).toBeInTheDocument();
  expect(submit).toBeInTheDocument();
});
