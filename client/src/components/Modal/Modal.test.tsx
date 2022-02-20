import Modal from "./Modal";
import { render, screen } from "../../tests/test-utils";

test("check if message is in components", () => {
  const message = "this is a message";
  const handleDelete = jest.fn();
  const handleClose = jest.fn();
  render(
    <Modal
      message={message}
      handleClose={handleClose}
      handleDelete={handleDelete}
    />
  );
  expect(screen.getByText(message)).toBeInTheDocument();
});

test("check if handleClose & handleDelete is called in component", () => {
  const handleClose = jest.fn();
  const handleDelete = jest.fn();
  render(
    <Modal
      message="this is a message"
      handleClose={handleClose}
      handleDelete={handleDelete}
    />
  );
  const closeButton = screen.getByText("Close");
  const deleteButton = screen.getByText("Delete");
  closeButton.click();
  deleteButton.click();
  expect(handleDelete).toHaveBeenCalled();
  expect(handleClose).toHaveBeenCalled();
});
