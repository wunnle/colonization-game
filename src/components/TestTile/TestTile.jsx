import React, { useState } from 'react';
import Tile from '../Tile'
import Planet from '../Planet'

const TestTile = () => {

  const [zAngle, setZAngle] = useState(0);
  const [xAngle, setXAngle] = useState(45);

  document.documentElement.style.setProperty('--planet-z-angle', zAngle + "deg");
  document.documentElement.style.setProperty('--planet-x-angle', xAngle + "deg");

  return (
    <div class="App">



      <label htmlFor="">Z Angle: {zAngle} </label>
      <input type="range" min="0" max="360" value={zAngle} onChange={(e) => setZAngle(e.target.value)} />
      <br/>
      <label htmlFor="">X Angle: {xAngle} </label>
      <input type="range" min="0" max="360" value={xAngle} onChange={(e) => setXAngle(e.target.value)} />
      <div className="board-holder">
        <Planet sunDirection='right'>
          <Tile level={2} owner='red' shadowLevel={0}></Tile>
          <Tile level={1} shadowLevel={0}></Tile>
          <Tile level={1} shadowLevel={0}></Tile>
          <Tile level={1} shadowLevel={0}></Tile>
        </Planet>
      </div>
    </div>
  )
}


export default TestTile