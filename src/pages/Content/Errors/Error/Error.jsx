import React, { useState } from 'react';

import cx from 'classnames';
import styles from './Error.module.scss';

const Error = ({ zone }) => {
  return (
    <div className={styles.tag}>
      <div className={styles.id}>
        <span> {zone.zoneId}</span>
      </div>
      <div className={styles.message}>
        <span>
          {zone.message
            ? zone.message
            : 'Код тега не запустился. Наиболее частые причины это запрет на запуск скриптов на стороне паба или конфликт с конкурентами'}
        </span>
      </div>
    </div>
  );
};
export default Error;
