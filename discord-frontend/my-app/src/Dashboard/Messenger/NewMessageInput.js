import React, { useState } from 'react';
import { styled } from '@mui/material';
import { connect } from 'react-redux';
import { sendDirectMessage } from '../../realtimeCommunication/socketConnection';

const MainContainer = styled('div')({
  position: 'fixed', // Makes the container fixed at a specific position.
  bottom: '5px',    // Adds some space from the bottom of the screen.       // Centers the container horizontally.
  width: '80%',      // Adjust the width to cover a portion of the screen.
  height: '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '8px',        // Adds rounded corners for aesthetics.
});

const Input = styled('input')({
  backgroundColor: '#2f3136',
  width: '98%',
  height: '44px',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '14px',
  padding: '0 10px',
});

const NewMessageInput = ({ chosenChatDetails }) => {
  const [message, setMessage] = useState('');

  const handleMessageValueChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyPressed = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if(message.length > 0){
      sendDirectMessage({
        receiverUserId: chosenChatDetails.id,
        content : message
      });
      setMessage('');
    }
  };

  return (
    <MainContainer>
      <Input
        placeholder={`Write message to ${chosenChatDetails?.name || '...'}`}
        value={message}
        onChange={handleMessageValueChange}
        onKeyDown={handleKeyPressed}
      />
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ chat }) => {
  return {
    ...chat,
  };
};

export default connect(mapStoreStateToProps)(NewMessageInput);
