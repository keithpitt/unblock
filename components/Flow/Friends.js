import styles from "./Friends.module.scss";
import Cursor from "./Cursor";

const Friends = ({viewport, cursorPosition}) => {
  const cursorViewportStyles = { position: "absolute", width: "100%", height: "100%", top: 0, left: 0, transformOrigin: "0 0" };
  if (viewport) {
    cursorViewportStyles.transform = `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`;
  }

  let cursor;
  if (cursorPosition) {
    cursor = <Cursor x={cursorPosition.x} y={cursorPosition.y} color="red" name="Steve" />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.others}>
        Omg friends!
      </div>
      <div style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "hidden"}}>
        <div style={cursorViewportStyles}>
          {cursor}
        </div>
      </div>
    </div>
  )
}

export default Friends
