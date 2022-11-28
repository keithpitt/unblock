import React from "react";
import styles from "./Cursor.module.scss";

export default function Cursor({ name, color, x, y }) {
  return (
    <div className={styles.container} style={{transform: `translateX(${x}px) translateY(${y}px)`}}>
      <svg
        width="24"
        height="36"
        viewBox="0 0 24 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
          fill={color}
        />
      </svg>
      <div className={styles.name} style={{backgroundColor: color}}>{name}</div>
    </div>
  );
}
