import { memo } from 'react';

import styles from './SectionNode.module.css';

const SectionNode = ({ data }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.label}>{data.label}</div>
      </div>
    </>
  );
};

export default memo(SectionNode);
