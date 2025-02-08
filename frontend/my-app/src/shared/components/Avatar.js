import React from 'react';
import { styled } from '@mui/material';

const AvatarPreview = styled('div')({
    height: '42px',
    width: '42px',
    background: "rgb(23,219,222)",
    background: 'linear-gradient(0deg, rgba(23,219,222,1) 0%, rgba(45,58,253,1) 100%)',
    borderRadius: '42px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: '700',
    color: 'white',
})

const Avatar = ( { username, large }) => {
  return (
    <AvatarPreview style={large ? { height : '80px' , width: '80px'} : {}}>
      {username.substring(0,2)}
    </AvatarPreview>
  );
};

export default Avatar
