import ProfileListItem from "./ProfileListItem";
import { render, screen, within } from "../../tests/test-utils";

const testProfileProps = {
  username: "usernameTest",
  firstName: "firstNameTest",
  lastName: "lastNameTest",
  bio: "this is test bio",
  created_at: `${new Date()}`,
  updated_at: `${new Date()}`,
  profile_image: "test",
};

test("ProfileListItem renders correctly when props are passed", () => {
  render(<ProfileListItem profile={testProfileProps} />);

  const date = new Date(testProfileProps.created_at);

  const username = screen.getByText(`@${testProfileProps.username}`);
  const fullName = screen.getByText(
    `${testProfileProps.firstName} ${testProfileProps.lastName}`
  );

  const bio = screen.getByText(testProfileProps.bio);
  const profile_image = screen.getByAltText("profile-img");
  const created_at = screen.getByText(
    `${date.getFullYear()} ${date.getMonth() + 1} ${date.getDate()}`
  );

  expect(username).toBeInTheDocument();
  expect(fullName).toBeInTheDocument();

  expect(bio).toBeInTheDocument();
  expect(profile_image).toBeInTheDocument();
  expect(created_at).toBeInTheDocument();
});
