import { memo } from 'react';
import { Handle, Position } from 'reactflow';

import styles from './CustomNode.module.css';

const sourceHandleStyleA = { left: 50 };
const sourceHandleStyleB = {
  right: 50,
  left: 'auto',
};

const CustomNode = ({ data, xPos, yPos }) => {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className={styles.container}>
        <div>
          Label: <strong>{data.label}</strong>
        </div>
        <div>
          Position:{' '}
          <strong>
            {xPos.toFixed(2)},{yPos.toFixed(2)}
          </strong>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={sourceHandleStyleA}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={sourceHandleStyleB}
      />
    </>
  );
};

export default memo(CustomNode);
