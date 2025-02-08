import React from 'react'
import { Button } from '@mui/material';

const CustomPrimaryButton = ({
    label,
    additionalStyles,
    disabled,
    onClick
}) => {
  return (
    <Button
    variant = 'contained'
    sx = {{
      bgcolor: '#00A5FF',
      color: 'white',
      textTransform: 'none',
      fontSixe: '16px',
      fontWeight: 500,
      width: "100%",
      height: "40px",
    }}
    style = {additionalStyles ? additionalStyles : {}}
    disabled= {disabled}
    onClick= {onClick}
    >
    {label}
    </Button>
      
    
  );
};

export default CustomPrimaryButton;
