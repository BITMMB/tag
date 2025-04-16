import React from 'react';
import Error from './Error';
import styles from './Errors.module.scss';

const Errors = ({ zones }) => {
  const zonesWithError = zones.filter((zone) => !zone.isActive);

  return (
    <div className={styles.container}>
      {zonesWithError.map((zone) => (
        <Error key={zone.zoneId} zone={zone} />
      ))}
    </div>
  );
};

export default Errors;
