import React, { Component } from 'react';
import styles, { tile, tileHolder, tileN, tileS, tileW, tileE, tileTop } from './Tile.module.scss'

const Tile = ({ level = 0, owner, handleClick, shadowLevel }) => {
  return (
    <TileHolder handleClick={handleClick} shadowLevel={shadowLevel}>
      <Building owner={owner} level={level} />
    </TileHolder>
  )
}

const Building = ({ owner, level }) => {
  return (
    <div className={`building building--${owner} level--${level}`}>
      <span className="building-inner">
        <div className="building-itself">
          {(level === 0) && ''}
          {(level === 1) && '🌱'}
          {(level === 2) && '🏠'}
          {(level === 3) && '🚀'}
        </div>
      </span>
      <span className="building-shadow">
      </span>
    </div>
  )
}

const shadowLevels = [styles.shadowLevel0, styles.shadowLevel1, styles.shadowLevel2, styles.shadowLevel3]

const TileHolder = ({ children, handleClick, shadowLevel }) => {
  return (
    <div className={tileHolder}>
      <div className={`${tile} ${shadowLevels[shadowLevel]}`} onClick={handleClick}>
        <div className={tileTop}>{children}</div>
        <div className={tileN}></div>
        <div className={tileS}></div>
        <div className={tileE}></div>
        <div className={tileW}></div>
      </div>
    </div>
  )
}

export default Tile;