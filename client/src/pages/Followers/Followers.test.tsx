import Followers from "./Followers";
import { render, screen } from "../../tests/test-utils";

test("Should render component", () => {
  render(<Followers />);

  const followers = screen.getByText(/No followers found./i);

  expect(followers).toBeInTheDocument();
});
