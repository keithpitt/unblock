import { memo } from 'react';
import { Handle, Position } from 'reactflow';

import styles from './CustomNode.module.css';

const CustomNode = ({ data }) => {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className={styles.container}>
        <div>
          Label: <strong>{data.label}</strong>
        </div>
      </div>
    </>
  );
};

export default memo(CustomNode);
