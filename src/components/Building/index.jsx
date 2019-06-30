
import React from 'react';
import styles from './Building.module.scss'

const byOwners = {
  blue: styles.buildingBlue,
  red: styles.buildingRed
}

export const Building = ({ owner, level, shadowLevel }) => (
  <div className={`${styles.building} ${byOwners[owner]} ${level > shadowLevel ? '' : styles.dark}`}>
      <span className={styles.buildingCircle}></span>
      <div className={styles.buildingItself}>
        {level === 0 && ''}
        {level === 1 && '🌱'}
        {level === 2 && '🏠'}
        {level === 3 && '🚀'}
      </div>
    </div>
)
  