import React, { Component, useState } from 'react';
import styles, { tile, tileHolder, sideTopOpaque, side1, side2, side3, side4, sideTop, buildingItself, shadow } from './Tile.module.scss'
import { Building } from '../Building';

const Tile = ({ level = 0, owner, handleClick, shadowLevel, zPosition, lightedUp }) => {
  return (
    <TileHolder handleClick={handleClick} shadowLevel={shadowLevel} lightedUp={lightedUp} zPosition={zPosition}>
      <Building owner={owner} level={level} shadowLevel={shadowLevel} isTopTransparent={!zPosition > 0} />
    </TileHolder>
  )
}

const shadowLevels = [styles.shadowLevel0, styles.shadowLevel1, styles.shadowLevel2, styles.shadowLevel3]

const TileHolder = ({ children, handleClick, shadowLevel, zPosition, lightedUp }) => {

  const [z, setZ] = useState(zPosition)


  return (
    <div className={`${tile} ${shadowLevels[shadowLevel]}`} onClick={handleClick}
      style={{
        transform: `translateZ(${zPosition}px)`,
        transitionDuration: `${z / 160 - 3.4}s`,
      }}>
      {children}
      <div className={lightedUp ? sideTop : sideTopOpaque}></div>
      <div className={side1}></div>
      <div className={side2}></div>
      <div className={side3}></div>
      <div className={side4}></div>
      <div className={shadow}></div>
    </div>
  )
}

export default Tile;