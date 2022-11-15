import { memo } from "react";
import { Handle, Position } from "reactflow";
import classNames from "classnames";
import Label from "./Label";
import styles from "./GroupStepNode.module.scss";

const Curve = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="10"
    fill="none"
    viewBox="0 0 10 10"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M10 0H0v10C0 4.477 4.477 0 10 0z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const GroupStepNode = ({
  id,
  data,
  sourcePosition,
  targetPosition,
  selected,
}) => {
  return (
    <>
      <div className={classNames("GroupStepDragHandle", styles.label)}>
        <Label>{data.label}</Label>
        <Curve />
        <Curve />
      </div>
      <div
        className={classNames(styles.container, {
          [styles.selected]: selected,
        })}
      ></div>
      <Handle
        id={id}
        type="target"
        position={targetPosition}
        className={styles.handle}
        isConnectable={false}
      />
      <Handle
        id={id}
        type="source"
        position={sourcePosition}
        className={styles.handle}
        isConnectable={false}
      />
    </>
  );
};

export default memo(GroupStepNode);
