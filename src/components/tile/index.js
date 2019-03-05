import React, { Component } from 'react';

const Tile = ({ level = 0, owner, handleClick, isBright }) => {
  return (
    <TileHolder handleClick={handleClick} isBright={isBright}>
      <Building owner={owner} level={level} />
    </TileHolder>
  )
}

const Building = ({ owner, level }) => {
  return (
    <div className={`building building--${owner} level--${level}`}>
      <span className="building-inner">
        {(level === 0) && '-'}
        {(level === 1) && '🌱'}
        {(level === 2) && '🏠'}
        {(level === 3) && '🚀'}
      </span>
      <span className="building-shadow">
      </span>
    </div>
  )
}

const TileHolder = ({ children, handleClick, isBright }) => {
  return (
    <div className={`tile tile--${isBright ? 'bright' : 'dark'}`} onClick={handleClick}>
      {children}
    </div>
  )
}

export default Tile;