import React, { Component } from 'react';

const Tile = ({state}) => {

  if(state = 'seed') {
    return <TileHolder>🌱</TileHolder>
  }

  if(state = 'lvl1') {
    return <TileHolder>🏠</TileHolder>
  }

  if(state = 'lvl2') {
    return <TileHolder>🏢</TileHolder>
  }

  return <TileHolder></TileHolder>
}

const TileHolder = ({children}) => (
  <div className="tile">
    {children}
  </div>
)
 
export default Tile;