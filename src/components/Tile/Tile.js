import React, { Component, useState } from 'react';
import styles, { tile, tileHolder, sideTopOpaque, side1, side2, side3, side4, sideTop, buildingItself } from './Tile.module.scss'

const Tile = ({ level = 0, owner, handleClick, shadowLevel, zPosition }) => {
  return (
    <TileHolder handleClick={handleClick} shadowLevel={shadowLevel} zPosition={zPosition}>
      <Building owner={owner} level={level} isTopTransparent={!zPosition > 0} />
    </TileHolder>
  )
}

const Building = ({ owner, level }) => {
  return (
    <div className={`building building--${owner} level--${level}`}>
      <span className="building-circle"></span>
      <div className={buildingItself}>
        {(level === 0) && ''}
        {(level === 1) && '🌱'}
        {(level === 2) && '🏠'}
        {(level === 3) && '🚀'}
      </div>
      <span className="building-shadow">
      </span>
    </div>
  )
}

const shadowLevels = [styles.shadowLevel0, styles.shadowLevel1, styles.shadowLevel2, styles.shadowLevel3]

const TileHolder = ({ children, handleClick, shadowLevel, zPosition }) => {

  const [z, setZ] = useState(zPosition)


 return (
    <div className={`${tile} ${shadowLevels[shadowLevel]}`} onClick={handleClick} 
    style={{
        transform: `translateZ(${zPosition}px)`,
        transitionDuration: `${z / 110}s`,
      }}>
      {children}
      <div className={zPosition > 0 ? sideTopOpaque : sideTop}></div>
      <div className={side1}>1</div>
      <div className={side2}>2</div>
      <div className={side3}>3</div>
      <div className={side4}>4</div>
    </div>
  )
}

export default Tile;