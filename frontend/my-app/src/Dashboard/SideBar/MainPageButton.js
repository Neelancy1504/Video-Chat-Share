import React from 'react';
import { Button } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';


const MainPageButton = () => {
  return (
    <Button
        style = {{
            width: '50px',
            height: '50px',
            borderRadius: '16px',
            margin: 0,
            padding: 0,
            minWidth: 0,
            marginTop: '10px',
            color: 'black',
            //background: "rgb(23,219,222)",
            //background: 'linear-gradient(0deg, rgba(23,219,222,1) 0%, rgba(45,58,253,1) 100%)'
            backgroundColor: 'white'

        }}
    >
        <GroupsIcon/>
    </Button>
  )
}

export default MainPageButton
