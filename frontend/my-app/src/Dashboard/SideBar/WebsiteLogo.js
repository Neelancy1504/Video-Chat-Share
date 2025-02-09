import React from 'react';
import bgImage from '../../images/new-logo2.png';

const MainPageButton = () => {
  return (
    <div
      style={{
        width: '60px', // Slightly increased size for better visibility
        height: '60px',
        borderRadius: '50%', // Circular shape
        backgroundColor: "white", // Black background
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: '10px',
      }}
    >
      <div
        style={{
          width: '50px',
          height: '60px',
          borderRadius: '50%',
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "contain", // Ensures full logo visibility
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </div>
  );
};

export default MainPageButton;
