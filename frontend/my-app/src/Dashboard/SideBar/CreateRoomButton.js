import React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import * as roomHandler from "../../realtimeCommunication/roomHandler";

const CreateRoomButton = ({ isUserInRoom }) => {
  const createNewRoomHandler = () => {
    roomHandler.createNewRoom();
  };

  return (
    <Button
      disabled={isUserInRoom}
      onClick={createNewRoomHandler}
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "16px",
        margin: 0,
        padding: 0,
        minWidth: 0,
        marginTop: "10px",
        color: "rgb(2, 15, 190)",
        //background: "rgb(23,219,222)",
        //background: 'linear-gradient(0deg, rgba(23,219,222,1) 0%, rgba(45,58,253,1) 100%)'
        backgroundColor: 'white'
      }}
    >
      <AddIcon />
    </Button>
  );
};

export default CreateRoomButton;



// import React from "react";
// import Button from "@mui/material/Button";
// import AddIcon from "@mui/icons-material/Add";
// import * as roomHandler from '../../realtimeCommunication/roomHandler';

// const CreateRoomButton = () => {
//   const createNewRoomHandler = () => {
//     //creating room and sending info to the server about the room , and server will send the info to the users..
//     roomHandler.createNewRoom();
//   };
//   return (
//     <Button
//         onClick = {createNewRoomHandler}
//         style = {{
//             width: '50px',
//             height: '50px',
//             borderRadius: '16px',
//             margin: 0,
//             padding: 0,
//             minWidth: 0,
//             marginTop: '10px',
//             color: 'white',
//             backgroundColor: '#5865F2'
//         }}
//     >
//         <AddIcon/>
//     </Button>);
// };

// export default CreateRoomButton;
