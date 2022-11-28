import { memo, useRef, useEffect } from "react";
import { makeMoveable, Draggable, Resizable } from "react-moveable";
import styles from "./SectionNode.module.scss";
import useStore from "./store";
import { GRID_SPACE } from "./constants";
import { GithubPicker } from "react-color";

const Moveable = makeMoveable([Draggable, Resizable]);

const SectionNode = ({ id, data, selected, dragging, emoji }) => {
  const resizeRef = useRef(null);
  const nodeElementRef = useRef(null);
  const moveableRef = useRef(null);

  useEffect(() => {
    nodeElementRef.current = document.querySelector(
      `.react-flow__node[data-id="${id}"]`
    );
  }, [id]);

  useEffect(() => {
    if (moveableRef.current && !moveableRef.isDragging) {
      moveableRef.current.updateRect();
    }
  }, [data]);

  const updateNodePosition = useStore((state) => state.updateNodePosition);
  const updateNodeStyle = useStore((state) => state.updateNodeStyle);
  const updateNodeData = useStore((state) => state.updateNodeData);

  const onResize = (event) => {
    if (!nodeElementRef.current) {
      return;
    }

    event.delta[0] && (nodeElementRef.current.style.width = `${event.width}px`);
    event.delta[1] &&
      (nodeElementRef.current.style.height = `${event.height}px`);

    updateNodePosition(id, ({ position }) => {
      return {
        x: event.direction[0] === -1 ? position.x - event.delta[0] : position.x,
        y: event.direction[1] === -1 ? position.y - event.delta[1] : position.y,
      };
    });
  };

  const onResizeEnd = (event) => {
    if (!nodeElementRef.current) {
      return;
    }

    updateNodeStyle(id, ({ style }) => {
      return {
        ...style,
        width: nodeElementRef.current.style.width,
        height: nodeElementRef.current.style.height,
      };
    });
  };

  const onColorChange = (event) => {
    updateNodeData(id, ({ data }) => {
      return { color: event.hex };
    });
  };

  const onLabelDoubleClick = (event) => {
    updateNodeData(id, ({ data }) => {
      return { label: prompt("Enter a label", data.label) };
    });
  };

  let style = {};
  if (data.color) {
    style.backgroundColor = data.color;
  }

  return (
    <>
      <Moveable
        ref={moveableRef}
        className="nodrag"
        resizable={selected}
        rotatable={false}
        hideDefaultLines={!selected}
        target={resizeRef}
        onResize={onResize}
        onResizeEnd={onResizeEnd}
        origin={true}
        keepRatio={false}
        throttleResize={GRID_SPACE}
      />

      <div
        className={styles.container}
        ref={resizeRef}
        style={style}
      >
        <div
          className={styles.toolbar}
          style={{ display: false && selected && !dragging ? "block" : "none" }}
        >
          <button>Color</button>
          <div className={styles.colorPicker}>
            <GithubPicker onChangeComplete={onColorChange} width={213} />
          </div>
        </div>
        <div className={styles.label} onDoubleClick={onLabelDoubleClick}>{data.label}</div>
      </div>
    </>
  );
};

export default memo(SectionNode);
