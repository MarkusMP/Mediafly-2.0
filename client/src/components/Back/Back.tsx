import { useNavigate } from "react-router-dom";
import styles from "./Back.module.scss";

const Back = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.back}>
      <button type="button" className={styles.btn} onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
};

export default Back;
