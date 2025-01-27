import React, { useState } from "react";
import { IconButton } from "@mui/material";
import ScreenShare from "@mui/icons-material/ScreenShare";
import StopScreenShare from "@mui/icons-material/StopScreenShare";

const ScreenShareButton = () => {
  const [isScreenSharingActive, setIsScreenSharingActive] = useState(true);

  const handleToggleScreenShare = () => {
    setIsScreenSharingActive(!isScreenSharingActive);
  };

  return (
    <IconButton onClick={handleToggleScreenShare} style={{color: 'white'}}>
      {isScreenSharingActive ? <ScreenShare /> : <StopScreenShare/>}
    </IconButton>
  );
};

export default ScreenShareButton;
