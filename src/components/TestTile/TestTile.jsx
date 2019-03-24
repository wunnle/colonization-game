import React from 'react';
import Tile from '../Tile'
import Planet from '../Planet'

const TestTile = () => {
  return (
    <div class="App">
      <input type="slider"/>
      <div className="board-holder">
        <Planet sunDirection='right'>
          <Tile level={0} shadowLevel={0}></Tile>
        </Planet>
      </div>
    </div>
  )
}


export default TestTile