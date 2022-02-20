import React from "react";
import styles from "./Modal.module.scss";

interface IModalProps {
  message: string;
  handleDelete: () => void;
  handleClose: () => void;
}
const Modal = (props: IModalProps) => {
  return (
    <div className={styles.modalWindow}>
      <div className={styles.modal}>
        <p>{props.message}</p>
        <div className={styles.buttons}>
          <button className={styles.btn} onClick={props.handleClose}>
            Close
          </button>
          <button className={styles.btnError} onClick={props.handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
