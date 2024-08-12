import React, { useState, useContext } from "react";
import Button from "../../components/Button";
import LinkDisplay from "../../components/LinkDisplay/index";
import { ThemeContext } from "../../ThemeContext";
import styles from "./Style.module.css";
import ThemeToggle from "../../components/ThemeToggle/index";

import { createChatInstance, LinkObjType } from "@chat-e2ee/service";

const App = () => {
  const [chatLink, setChatLink] = useState<LinkObjType>(null);
  const [loading, setLoading] = useState(false);
  const [darkMode] = useContext(ThemeContext);

  const generateLink = async () => {
    if (loading) {
      return;
    }
    
    setLoading(true);
    try {
      const chate2ee = createChatInstance();
      const linkResp = await chate2ee.getLink();
      setChatLink(linkResp);
    } catch (error: any) {
      console.error(error);
      alert(error.message);
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.linkGenerationPage}>
        <div
          className={`${styles.header}
          ${darkMode === true ? styles.darkModeHeader : styles.lightModeHeader}`}
        >
          🔐 一次性端到端加密聊天
          <ThemeToggle />
        </div>
        <div className={`${styles.sectionDefault} ${!darkMode && styles.sectionDefaultLight}`}>
          <div className={styles.title}>
          安全的端到端加密环境，用于交换敏感信息。
          </div>
          <div className={styles.description}>
            <ul>
              <li>无需登录/注册</li>
              <li>无跟踪器</li>
              <li>
                您的消息是<b>端到端加密</b>的 —— 从技术上讲，其他人无法读取您的消息
              </li>
            </ul>
          </div>
          {!chatLink && (
            <div className={styles.linkGenerationBtnContainer}>
              <br />
              <Button
                label={loading?"创建中":"创建聊天链接"}
                type="primary"
                onClick={generateLink}
                disabled={loading}
              />
            </div>
          )}
          {chatLink && (
            <div className={styles.captchaHeightSetter}>
              <LinkDisplay content={chatLink} />
            </div>
          )}
        </div>
        <div
          className={`${styles.sectionContribute} ${
            darkMode === true ? styles.sectionDefault : styles.sectionDefaultLight
          }`}
        >
          <div className={styles.title}>
            ❤️&nbsp;源代码在&nbsp;
            <a
              href="https://github.com/muke1908/chat-e2ee"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
            &nbsp;上公开, 欢迎贡献！&nbsp;你也可以查看&nbsp;<a
              href="https://github.com/hfdem/chat-e2ee"
              target="_blank"
              rel="noopener noreferrer"
            >
              我的仓库
            </a>。
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
