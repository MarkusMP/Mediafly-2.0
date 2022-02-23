import Post from "./Post";
import { render, screen, fireEvent } from "../../tests/test-utils";

const postProps = {
  id: "id1",
  text: "this is text",
  image: "image.jpg",
  likesCount: 1,
  commentsCount: 1,
  profile: {
    id: "id2",
    firstName: "testFirstName",
    lastName: "testLastName",
    username: "testUser",
    profile_image: "test/image",
  },
};

test("Should render correctly when props is passed", () => {
  render(<Post post={postProps} />);

  const image = screen.getByRole("img", { name: /post\-img/i });
  const text = screen.getByText(/this is text/i);

  expect(image).toBeInTheDocument();
  expect(text).toBeInTheDocument();
});

test("Clicking profile should redirct you to their profile", () => {
  const { container } = render(<Post post={postProps} />);
  const profile = container.querySelector("a");
  if (profile) fireEvent.click(profile);

  expect(window.location.href).toBe(
    `http://localhost/profile/${postProps.profile.username}`
  );
});
