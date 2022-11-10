import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import classNames from 'classnames';

import styles from './StepNode.module.scss';

const StepNode = ({ id, data, x, y, sourcePosition, targetPosition, selected }) => {
  return (
    <>
      <div className={classNames(styles.default, { [ styles.selected ]: selected })}>
        <div>{data.label}</div>
        <div className={styles.elapsed}>4m 39s</div>
      </div>

      <Handle id={id} type="target" position={targetPosition} className={styles.handle} isConnectable={false} />
      <Handle id={id} type="source" position={sourcePosition} className={styles.handle} isConnectable={false} />
    </>
  );
};

export default memo(StepNode);
