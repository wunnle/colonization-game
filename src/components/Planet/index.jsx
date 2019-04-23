import React from 'react';

const Planet = ({children, sunDirection, bricksFallen, lightedUp}) => {
  return ( 
    <div className={`planet sun-${sunDirection} ${bricksFallen ? ' bricksFallen' : ''} ${lightedUp ? ' lightedUp' : ''}`}>
      {children}
    </div>
   );
}
 
export default Planet;