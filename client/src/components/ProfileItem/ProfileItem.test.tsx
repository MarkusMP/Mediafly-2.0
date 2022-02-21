import ProfileItem from "./ProfileItem";
import { render, screen, within } from "../../tests/test-utils";

const testProfileProps = {
  id: "1",
  username: "usernameTest",
  firstName: "firstNameTest",
  lastName: "lastNameTest",
  bio: "this is test bio",
  created_at: `${new Date()}`,
  updated_at: `${new Date()}`,
  followersCount: 1,
  followingCount: 1,
  profile_image: "test",
};

test("ProfileItem renders correctly when props are passed", () => {
  render(<ProfileItem profile={testProfileProps} />);

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

  const followersCount =
    screen.getByText(/followers:/i).parentNode?.childNodes[1];

  const followingCount =
    screen.getByText(/following:/i).parentNode?.childNodes[1];

  expect(username).toBeInTheDocument();
  expect(fullName).toBeInTheDocument();

  expect(bio).toBeInTheDocument();
  expect(profile_image).toBeInTheDocument();
  expect(created_at).toBeInTheDocument();
  expect(followersCount).toContainHTML(
    testProfileProps.followersCount.toString()
  );
  expect(followingCount).toContainHTML(
    testProfileProps.followingCount.toString()
  );
});
