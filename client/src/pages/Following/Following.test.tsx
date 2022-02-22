import Following from "./Following";
import { render, screen } from "../../tests/test-utils";

test("Should render component", () => {
  render(<Following />);

  const following = screen.getByText(/This user isn't following anyone.../i);

  expect(following).toBeInTheDocument();
});
