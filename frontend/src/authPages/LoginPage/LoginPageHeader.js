import React from 'react';
import { Typography } from '@mui/material';

const LoginPageHeader = () => {
  return (
    <>
      <Typography sx={{ color: "black" , paddingTop: '30px' , fontSize: '30px' , fontWeight: '600'}}>
        Welcome Back!
      </Typography>
      <Typography sx = {{ color: "#b9bbbe", marginBottom: "10px" , fontSize: '16px'}}>
        We are happy that you are with us!
      </Typography>
    </>
  )
}

export default LoginPageHeader
