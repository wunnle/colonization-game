import React, { useState } from 'react';
export const Controls = () => {
  const [zAngle, setZAngle] = useState(0);
  const [xAngle, setXAngle] = useState(45);
  document.documentElement.style.setProperty('--planet-z-angle', zAngle + "deg");
  document.documentElement.style.setProperty('--planet-x-angle', xAngle + "deg");
  return (<div className='controls'>
    <label htmlFor="">Z Angle: {zAngle} </label>
    <input type="range" min="0" max="360" value={zAngle} onChange={(e) => setZAngle(e.target.value)} />
    <br />
    <label htmlFor="">X Angle: {xAngle} </label>
    <input type="range" min="0" max="70" value={xAngle} onChange={(e) => setXAngle(e.target.value)} />
  </div>);
};
