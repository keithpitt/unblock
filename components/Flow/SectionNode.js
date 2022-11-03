import { memo, useRef, useEffect } from 'react';
import { makeMoveable, Draggable, Resizable, } from 'react-moveable';

import styles from './SectionNode.module.css';
import useStore from './store';

const Moveable = makeMoveable([Draggable, Resizable]);

const SectionNode = ({ id, data, selected, isDragging }) => {
  const resizeRef = useRef(null);
  const nodeElementRef = useRef(null);

  useEffect(() => {
    nodeElementRef.current = document.querySelector(`.react-flow__node[data-id="${id}"]`);
  }, [id]);

  const resizeNodeWithCallback = useStore((state) => state.resizeNodeWithCallback);

  const onResize = (event) => {
    if (!nodeElementRef.current) {
      return;
    }

    event.delta[0] && (nodeElementRef.current.style.width = `${event.width}px`);
    event.delta[1] && (nodeElementRef.current.style.height = `${event.height}px`);

    resizeNodeWithCallback(id, ({style, position}) => {
      const changes = {
        style: {},
        position: {
          x: event.direction[0] === -1 ? position.x - event.delta[0] : position.x,
          y: event.direction[1] === -1 ? position.y - event.delta[1] : position.y,
        }
      }

      event.delta[0] && (changes.style.width = event.width);
      event.delta[1] && (changes.style.height = event.height);

      return changes;
    });
  };

  return (
    <>
      <Moveable
        className="nodrag"
        resizable={selected}
        rotatable={false}
        hideDefaultLines={!selected}
        target={resizeRef}
        onResize={onResize}
        origin={true}
        keepRatio={false}
        throttleResize={20}
      />

      <div className={styles.container} ref={resizeRef}>
        <div className={styles.label}>{data.label}</div>
      </div>
    </>
  );
};

export default memo(SectionNode);
