import React from 'react';
import Tile from '../Tile'
import Planet from '../Planet'
import { Controls } from './Controls';

const TestTile = () => {

  return (
    <>
    <Controls />
    <div class="App">
      <div className="board-holder">
        <Planet sunDirection='right'>
          <Tile level={2} owner='red' shadowLevel={0}></Tile>
          <Tile level={1} shadowLevel={0}></Tile>
          <Tile level={1} shadowLevel={0}></Tile>
          <Tile level={1} shadowLevel={0}></Tile>
        </Planet>
      </div>
    </div>
    </>
  )
}


export default TestTile