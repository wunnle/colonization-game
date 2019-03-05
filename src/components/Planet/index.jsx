import React from 'react';

const Planet = ({children, sunDirection}) => {
  return ( 
    <div className={`planet sun-${sunDirection}`}>
      {children}
    </div>
   );
}
 
export default Planet;