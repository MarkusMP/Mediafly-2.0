import { Link } from "react-router-dom";
import styles from "./ProfileListItem.module.scss";

interface IProfile {
  username: string;
  firstName: string;
  lastName: string;
  bio: string;
  profile_image: string;
  created_at: string;
  updated_at: string;
}

interface IProfileListItemProps {
  profile: IProfile;
}

const ProfileListItem = (props: IProfileListItemProps) => {
  const { bio, firstName, lastName, profile_image, username, created_at } =
    props.profile;

  const date = new Date(created_at);
  return (
    <Link to={`/profile/${username}`} className={styles.link}>
      <div className={styles.card}>
        <div className={styles.container}>
          <img src={profile_image} alt="profile-img" />

          <h1>
            {firstName} {lastName}
          </h1>
          <h3>@{username}</h3>
          <div className={styles.date}>
            <p>
              <span className={styles.bold}>Joined:</span> {date.getFullYear()}{" "}
              {date.getMonth() + 1} {date.getDate()}
            </p>
          </div>
          <p className={styles.bio}>{bio}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProfileListItem;
