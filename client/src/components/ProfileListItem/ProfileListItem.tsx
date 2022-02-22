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

const addDefaultSrc = (ev: any) => [
  (ev.target.src =
    "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"),
];

const ProfileListItem = (props: IProfileListItemProps) => {
  const { bio, firstName, lastName, profile_image, username, created_at } =
    props.profile;

  const date = new Date(created_at);
  return (
    <Link to={`/profile/${username}`} className={styles.link}>
      <div className={styles.card}>
        <div className={styles.container}>
          <img src={profile_image} alt="profile-img" onError={addDefaultSrc} />

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
