import React from 'react';
import ShadowBoard from '../ShadowBoard'
import styles from './Planet.module.scss'

const sun = {
  right: styles.sunRight,
  left: styles.sunLeft,
  up: styles.sunUp,
  down: styles.sunDown
}

const Planet = ({ children, sunDirection, bricksFallen, lightedUp }) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.planet} ${sun[sunDirection]} ${bricksFallen ? ' bricksFallen' : ''} ${lightedUp ? styles.lightedUp : ''}`}>
        <ShadowBoard />
        {children}
      </div>
    </div>
  );
}

export default Planet