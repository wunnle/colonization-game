
import React from 'react';
import styles from './Building.module.scss'

export const Building = ({
  owner,
  level,
  shadowLevel
}) => {
  return <div className={`building building--${owner} level--${level} ${styles['shadowLevel'+level]} ${level > shadowLevel ? '' : styles.dark}`}>
      <span className="building-circle"></span>
      <div className={styles.buildingItself}>
        {level === 0 && ''}
        {level === 1 && '🌱'}
        {level === 2 && '🏠'}
        {level === 3 && '🚀'}
      </div>
    </div>;
};
  