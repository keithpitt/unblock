import { memo } from "react";
import { Handle, Position } from "reactflow";
import classNames from "classnames";
import Label from "./Label";

import styles from "./StepNode.module.scss";

const StepNode = ({
  id,
  data,
  x,
  y,
  sourcePosition,
  targetPosition,
  selected,
  emoji,
}) => {
  return (
    <>
      <div
        className={classNames(styles.default, { [styles.selected]: selected })}
      >
        <Label emoji={emoji}>{data.label}</Label>
        <div className={styles.elapsed}>4m 39s</div>
      </div>

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

export default memo(StepNode);
