import { useEffect, useState } from "react";
import styles from "./Message.module.scss";

interface IMessageProps {
  message: string;
  error: boolean;
}

const Message = ({ message, error }: IMessageProps) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (!message) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [message]);

  if (!isVisible) return null;
  return (
    <div
      className={
        error
          ? `${styles.message} ${styles.error}`
          : `${styles.message} ${styles.success}`
      }
    >
      <p>{message}</p>
    </div>
  );
};

export default Message;
