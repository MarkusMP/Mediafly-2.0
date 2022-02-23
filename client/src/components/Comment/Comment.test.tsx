import { render, screen } from "../../tests/test-utils";
import Comment from "./Comment";

const commentProp = {
  id: "21c75488-cc06-4db6-8347-029603b0f244",
  post_id: "daaaa78f-8355-4271-935a-afc00ad7a6b1",
  text: "test one",
  created_at: "2022-02-23T05:31:28.585Z",
  profile: {
    id: "c4d83b14-745f-42d1-ba67-93818ee1231e",
    username: "wdqw",
    firstName: "John",
    lastName: "Doe",
    profile_image: "",
  },
  likesCount: 0,
};

test("should render component correctly", () => {
  render(<Comment comment={commentProp} />);

  const comment = screen.getByText(commentProp.text);
  const profile = screen.getByText(`@${commentProp.profile.username}`);
  const likes = screen.getByText(commentProp.likesCount);
  const image = screen.getByRole("img", { name: /profile\-img/i });

  expect(comment).toBeInTheDocument();
  expect(profile).toBeInTheDocument();
  expect(likes).toBeInTheDocument();
  expect(image).toBeInTheDocument();
});
