import React from 'react';
import { styled } from '@mui/material';
import { Typography } from '@mui/material';

const Wrapper = styled('div')({
    flexGrow: 1,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

const WelcomeMessage = () => {
  return (
    <Wrapper>
      <Typography
        variant= 'h6' sx= {{color: 'black', fontWeight: '600'}}>
        To start chatting - chose conversation
      </Typography>
    </Wrapper>
  )
}

export default WelcomeMessage;
