import React from "react";
import { styled } from "@mui/material";
import ScreenShareButton from "./ScreenShareButton";
import MicButton from "./MicButton";
import CloseRoomButton from "./CloseRoomButton";
import CameraButton from "./CameraButton";

const MainContainer = styled("div")({
  height: "15%",
  width: "100%",
  backgroundColor: "#5865f2",
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const RoomButton = () => {
  return <MainContainer>
    <ScreenShareButton />
    <MicButton />
    <CameraButton />
    <CloseRoomButton />
  </MainContainer>;
};

export default RoomButton;
