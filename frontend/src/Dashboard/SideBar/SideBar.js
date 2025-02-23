import React from "react";
import { styled } from "@mui/system";
import MainPageButton from "./MainPageButton";
import CreateRoomButton from "./CreateRoomButton";
import { connect } from "react-redux";
import ActiveRoomButton from "./ActiveRoomButton";
import WebsiteLogo from "./WebsiteLogo";

const MainContainer = styled("div")({
  width: "72px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "rgb(6, 94, 171)",
  borderTop: '1px solid #808080'
});

const SideBar = ({ activeRooms, isUserInRoom }) => {
  return (
    <MainContainer>
      <WebsiteLogo />
      <MainPageButton />
      <CreateRoomButton isUserInRoom={isUserInRoom} />
      {activeRooms.map((room) => (
        <ActiveRoomButton
          roomId={room.roomId}
          creatorUsername={room.creatorUsername}
          amountOfParticipants={room.participants.length}
          key={room.roomId}
          isUserInRoom={isUserInRoom}
        />
      ))}
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

export default connect(mapStoreStateToProps)(SideBar);



// import React from "react";
// import { styled } from "@mui/material";
// import MainPageButton from "./MainPageButton";
// import CreateRoomButton from "./CreateRoomButton";
// import { connect } from "react-redux";
// import ActiveRoomButton from "./ActiveRoomButton";

// const MainContainer = styled("div")({
//   width: "72px",
//   height: "100%",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   backgroundColor: "#202225",
// });

// const SideBar = ({activeRooms , isUserInRoom}) => {
//   return (
//     <MainContainer>
//       <MainPageButton />
//       <CreateRoomButton />
//       {activeRooms.map((room) => (
//         <ActiveRoomButton 
//           roomId = {room.roomId}
//           creatorUsername = {room.creatorUsername}
//           amountOfParticipants = {room.participants.length}
//           key={room.roomId}
//           isUserInRoom = {isUserInRoom}
//         />
//       ))}
//     </MainContainer>
//   );
// };

// const mapStoreStateToProps = ({room}) => {
//   return  {
//     ...room,
//   }
// }

// export default connect(mapStoreStateToProps)(SideBar);
