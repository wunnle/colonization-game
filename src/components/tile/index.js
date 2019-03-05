import React, { Component } from 'react';

const Tile = ({ level = 0, owner, handleClick, isBright }) => {
  return (
    <TileHolder handleClick={handleClick} isBright={isBright}>
      <Building owner={owner}>
        {(level === 0) && '-'}
        {(level === 1) && '🌱'}
        {(level === 2) && '🏠'}
        {(level === 3) && '🚀'}
      </Building>
    </TileHolder>
  )
}

const Building = ({ owner, children }) => {
  return (
    <div className={`building building--${owner}`}>
      {children}
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