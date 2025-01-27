import React from 'react';
import { Typography } from '@mui/material';

const LoginPageHeader = () => {
  return (
    <>
      <Typography variant = 'h5' sx={{ color: "white"}}>
        Welcome Back!
      </Typography>
      <Typography sx = {{ color: "#b9bbbe", marginBottom: "10px"}}>
        We are happy that you are with us!
      </Typography>
    </>
  )
}

export default LoginPageHeader
