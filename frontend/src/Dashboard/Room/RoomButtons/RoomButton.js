import React from "react";
import { styled } from "@mui/system";
import CameraButton from "./CameraButton";
import MicButton from "./MicButton";
import CloseRoomButton from "./CloseRoomButton";
import ScreenShareButton from "./ScreenShareButton";
import { connect } from "react-redux";
import { getActions } from "../../../store/actions/roomActions";

const MainContainer = styled("div")({
  height: "15%",
  width: "100%",
  backgroundColor: "rgb(6, 94, 171);",
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const RoomButtons = (props) => {
  const { localStream, isUserJoinedWithOnlyAudio } = props;

  return (
    <MainContainer>
      {!isUserJoinedWithOnlyAudio && <ScreenShareButton {...props} />}
      <MicButton localStream={localStream} />
      <CloseRoomButton />
      {!isUserJoinedWithOnlyAudio && <CameraButton localStream={localStream} />}
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(RoomButtons);


// import React from "react";
// import { styled } from "@mui/material";
// import ScreenShareButton from "./ScreenShareButton";
// import MicButton from "./MicButton";
// import CloseRoomButton from "./CloseRoomButton";
// import CameraButton from "./CameraButton";
// import {connect} from 'react-redux';

// const MainContainer = styled("div")({
//   height: "15%",
//   width: "100%",
//   backgroundColor: "#5865f2",
//   borderTopLeftRadius: "8px",
//   borderTopRightRadius: "8px",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// });

// const RoomButton = ( {localStream} ) => {
//   return (
//     <MainContainer>
//       <ScreenShareButton />
//       <MicButton localStream={localStream}/>
//       <CameraButton localStream={localStream}/>
//       <CloseRoomButton />
//     </MainContainer>
//   );
// };

// const mapStoreStateToProps = ({ room }) => {
//   return {
//     ...room,
//   };
// };

// export default connect(mapStoreStateToProps)(RoomButton);
