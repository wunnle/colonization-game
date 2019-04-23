import React from 'react';
import ShadowBoard from '../ShadowBoard'


const Planet = ({ children, sunDirection, bricksFallen, lightedUp }) => {
  return (
    <div className={`planet sun-${sunDirection} ${bricksFallen ? ' bricksFallen' : ''} ${lightedUp ? ' lightedUp' : ''}`}>
      <ShadowBoard />
      {children}
    </div>
  );
}

export default Planet