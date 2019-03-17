import React, { Component } from 'react';

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
        {(level === 0) && '-'}
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

const TileHolder = ({ children, handleClick, shadowLevel }) => {
  return (
    <div className={`tile shadowLevel--${shadowLevel}`} onClick={handleClick}>
      {children}
    </div>
  )
}

export default Tile;