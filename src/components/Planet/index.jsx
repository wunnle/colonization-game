import React from 'react';

const Planet = ({children, sunDirection, bricksFallen}) => {
  return ( 
    <div className={`planet sun-${sunDirection} ${bricksFallen ? ' bricksFallen' : ''}`}>
      {children}
    </div>
   );
}
 
export default Planet;