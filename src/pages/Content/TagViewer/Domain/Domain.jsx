import React from 'react';
import styles from './Domain.module.scss';
import { PlusSquareFilled, CloseCircleFilled } from '@ant-design/icons';
import cx from 'classnames';

const Domain = ({ url, status }) => {
  const { adb, g, av, gr, sl } = status.flags;
  const domain = new URL(url);

  const getIcon = (status) => {
    return status ? (
      <PlusSquareFilled style={{ color: 'green' }} />
    ) : (
      <CloseCircleFilled style={{ color: '#c40000' }} />
    );
  };

  return (
    <div
      className={cx(
        styles.container,
        status.isActive ? styles.active : styles.blocked
      )}
    >
      <div className={styles.domain}>{domain.hostname}</div>
      <div className={status.isActive ? styles.isActive : styles.isNotActive}>
        {status.isActive ? 'Active' : 'Not Active'}
      </div>
      <div className={styles.flag}>aavst{getIcon(adb)}</div>
      <div className={styles.flag}>virus{getIcon(g)}</div>
      <div className={styles.flag}>av{getIcon(av)}</div>
      <div className={styles.flag}>gr{getIcon(gr)}</div>
      <div className={styles.flag}>sl{getIcon(sl)}</div>
    </div>
  );
};

export default Domain;
