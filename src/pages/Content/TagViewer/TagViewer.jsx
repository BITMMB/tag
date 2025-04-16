import React, { useState } from 'react';
import Tag from './Tag/Tag';
import TargetingForm from './TargetingForm/';
import { Spin } from 'antd';
import Domain from './Domain/Domain';
import styles from './TagViewer.module.scss';

const TagViewer = ({ zones, domains, hasBeenStarted, isLoading }) => {
  const [loading, setLoading] = useState(false);

  const domainsList = Object.keys(domains);

  return (
    <Spin spinning={loading}>
      <TargetingForm setLoading={setLoading} />
      {hasBeenStarted && !isLoading ? (
        <div>
          {domainsList.length ? (
            <div className={styles.container}>
              <div className={styles.title}>Домены</div>
              {domainsList.map((url) => (
                <Domain key={url} url={url} status={domains[url]} />
              ))}
            </div>
          ) : (
            <div className={styles.message}>Домены не найдены</div>
          )}

          {zones.length ? (
            <div className={styles.container}>
              <div className={styles.title}>Зоны</div>
              {zones.map((zone) => (
                <Tag key={zone.zoneId} zone={zone} />
              ))}
            </div>
          ) : (
            <div className={styles.message}>Зоны не найдены</div>
          )}
        </div>
      ) : (
        !isLoading && <div className={styles.message}>Начни поиск</div>
      )}
    </Spin>
  );
};

export default TagViewer;
