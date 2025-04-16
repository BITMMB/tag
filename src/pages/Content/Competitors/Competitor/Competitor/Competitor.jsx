import React from 'react';

import styles from './Competitor.module.scss';

const Competitor = ({ competitor }) => {
  return (
    <div className={styles.tag}>
      <img src={competitor} className={styles.competitor} />
    </div>
  );
};
export default Competitor;
