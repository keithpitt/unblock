import styles from "./Friends.module.scss";
import Cursor from "./Cursor";
import useStore from "./store";

const COLORS_PRESENCE = ["255, 69, 225", "255, 64, 64", "255, 166, 3"];
const NAMES_PRESENCE = ["Tracy", "Chuck"];

const Friends = ({viewport, cursorPosition}) => {
  const cursorViewportStyles = { position: "absolute", width: "100%", height: "100%", top: 0, left: 0, transformOrigin: "0 0" };
  if (viewport) {
    cursorViewportStyles.transform = `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`;
  }

  const otherCursors = useStore((state) => state.liveblocks.others).map((user) => [ user.connectionId, user.presence.cursor, user.presence.isInteracting ]);

  return (
    <div className={styles.container}>
      <div className={styles.others}>
        {otherCursors.map(([id, cursor]) =>
          <div key={id}>{id}</div>
        )}
      </div>
      <div style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "hidden"}}>
        <div style={cursorViewportStyles}>
          {otherCursors.map(([id, cursor, isInteracting]) => {
            if (cursor == null || isInteracting) {
              return null;
            }

            return (
              <Cursor
              key={`cursor-${id}`}
              color={`rgb(${COLORS_PRESENCE[id % COLORS_PRESENCE.length]}`}
              name={NAMES_PRESENCE[id % NAMES_PRESENCE.length]}
              x={cursor.x}
              y={cursor.y}
            />
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default Friends
