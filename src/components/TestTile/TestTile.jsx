import React from 'react';
import Tile from '../Tile'
import Planet from '../Planet'

const TestTile = () => {
  return (
    <div class="App">
      <div className="board-holder">
        <Planet sunDirection='right'>
        <Tile></Tile>
        </Planet>
      </div>
    </div>
  )
}


export default TestTile