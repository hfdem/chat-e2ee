import React, { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";
import styles from "./Style.module.css";

const DeleteChatLink = ({ handleDeleteLink }: any) => {
  const [darkMode] = useContext(ThemeContext);

  const deleteHandler = async () => {
    if (window.confirm("想要永久销毁链接吗?")) await handleDeleteLink();
  };

  return (
    <div>
      <div
        className={`${styles.deleteButton} ${!darkMode && styles.lightModeDelete}`}
        role="button"
        onClick={deleteHandler}
      >
        销毁链接
      </div>
    </div>
  );
};

export default DeleteChatLink;
