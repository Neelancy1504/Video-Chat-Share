import React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import * as roomHandler from '../../realtimeCommunication/roomHandler';

const CreateRoomButton = () => {
  const createNewRoomHandler = () => {
    //creating room and sending info to the server about the room , and server will send the info to the users..
    roomHandler.createNewRoom();
  };
  return (
    <Button
        onClick = {createNewRoomHandler}
        style = {{
            width: '50px',
            height: '50px',
            borderRadius: '16px',
            margin: 0,
            padding: 0,
            minWidth: 0,
            marginTop: '10px',
            color: 'white',
            backgroundColor: '#5865F2'
        }}
    >
        <AddIcon/>
    </Button>);
};

export default CreateRoomButton;
