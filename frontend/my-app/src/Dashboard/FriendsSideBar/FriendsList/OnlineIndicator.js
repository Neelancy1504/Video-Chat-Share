import React from 'react';
import { styled } from '@mui/material';
import FiberManualRecord from '@mui/icons-material/FiberManualRecord';
import {Box} from '@mui/material';

const OnlineIndicator = () => {
  return (
    <Box sx= {{
        color: '#3ba55d',
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        right: '5px',
    }}
>
      <FiberManualRecord />
    </Box>
  )
}

export default OnlineIndicator
