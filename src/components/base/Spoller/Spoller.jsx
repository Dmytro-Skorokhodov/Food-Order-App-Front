//filters__filter filter
import { useState, useRef } from "react";
import styles from "./Spoller.module.scss";

export default function Spoller({
  className,
  btnText,
  iconName,
  children,
  onShow,
  onClick,
}) {
  const [isShown, setisShown] = useState(false);
  const blockHeight = useRef();

  function showFilterContentHandler(e) {
    e.preventDefault();
    setisShown((prev) => !prev);
    onShow();
  }

  const showFilterBodyStyle = isShown
    ? { maxHeight: `${blockHeight.current.scrollHeight}px`, visibility: "visible" }
    : undefined;

  return (
    <div className={`${className}__spoller`}>
      <button
        onClick={(e) => showFilterContentHandler(e)}
        className={styles.spoller__button}>
        {btnText}
        <span className={`${iconName} ${isShown ? styles["icon-clicked"] : ""}`}></span>
      </button>
      <div
        ref={blockHeight}
        className={`${styles["spoller__body"]} ${styles["body-spoller"]}`}
        style={showFilterBodyStyle}>
        {children}
      </div>
    </div>
  );
}
