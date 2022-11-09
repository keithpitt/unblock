import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import classNames from 'classnames';

import styles from './GroupStepNode.module.css';

const GroupStepNode = ({ id, data, sourcePosition, targetPosition, selected }) => {
  return (
    <>
      <div className={classNames("GroupStepDragHandle", styles.label)}>{data.label}</div>
      <div className={classNames(styles.container, { [ styles.selected ]: selected })}></div>
      <Handle id={id} type="target" position={targetPosition} className={styles.handle} isConnectable={false} />
      <Handle id={id} type="source" position={sourcePosition} className={styles.handle} isConnectable={false} />
    </>
  );
};

export default memo(GroupStepNode);
