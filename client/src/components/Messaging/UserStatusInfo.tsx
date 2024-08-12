import React, { useState } from "react";
import styles from "./styles/UserStatusInfo.module.css";
import ThemeToggle from "../ThemeToggle/index";
import imageRetryIcon from "./assets/image-retry.png";
import DeleteChatLink from "../DeleteChatLink";

export const UserStatusInfo = ({
  online,
  getSetUsers,
  channelID,
  handleDeleteLink
}: {
  online: any;
  getSetUsers: any;
  channelID: any;
  handleDeleteLink: any;
}) => {
  const [loading, setLoading] = useState(false);

  const fetchKeyAgain = async () => {
    if (loading) return;

    setLoading(true);
    await getSetUsers(channelID);
    setLoading(false);
  };

  return (
    <div className={styles.userInfo}>
      {online ? (
        <span className={styles.userInfoOnline}>
          Alice {"<"}在线{">"}
        </span>
      ) : (
        <div className={styles.userOnlineWaiting}>
          等待 Alice 加入...
          <img
            className={
              loading ? `${styles.retryImageIcon} ${styles.loading}` : `${styles.retryImageIcon}`
            }
            src={imageRetryIcon}
            onClick={fetchKeyAgain}
            alt="retry-icon"
          />
        </div>
      )}
      <DeleteChatLink handleDeleteLink={handleDeleteLink} />
      <ThemeToggle />
    </div>
  );
};
