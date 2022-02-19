import { useEffect, useState } from "react";
import styles from "./Message.module.scss";

interface IMessageProps {
  message: string;
}

const Message = ({ message }: IMessageProps) => {
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
    <div className={styles.message}>
      <p>{message}</p>
    </div>
  );
};

export default Message;
