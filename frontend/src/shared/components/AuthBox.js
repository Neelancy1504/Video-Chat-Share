import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material';
import bgImage from '../../images/loginpage.png';

const BoxWrapper = styled('div')({
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover", // This ensures the image covers the container
    backgroundPosition: "center", // Centers the image
    backgroundRepeat: "no-repeat", // Prevents image from repeating
    //background: '#5865F2'
})

const AuthBox = (props) => {
  return (
    <BoxWrapper>
        <Box
            sx = {{
                width: 500,
                height: 700,
                bgcolor: 'white',
                borderRadius: '35px' ,
                boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                display: 'flex',
                flexDirection: 'column',
                padding: '25px',
            }}
        >
            {props.children}
        </Box>
    </BoxWrapper> 
  );
};

export default AuthBox
