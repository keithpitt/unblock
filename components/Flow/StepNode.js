import { memo } from 'react';
import { Handle, Position } from 'reactflow';

import styles from './StepNode.module.css';

const StepNode = ({ id, data, x, y, sourcePosition, targetPosition, selected }) => {
  return (
    <>
      <div className={selected ? styles.selected : styles.default}>
        <div>{data.label}</div>
      </div>

      <Handle id={id} type="target" position={targetPosition} className={styles.handle} isConnectable={false} />
      <Handle id={id} type="source" position={sourcePosition} className={styles.handle} isConnectable={false} />
    </>
  );
};

export default memo(StepNode);
