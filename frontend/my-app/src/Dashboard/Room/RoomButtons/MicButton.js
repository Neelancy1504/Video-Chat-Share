import React, { useState } from "react";
import { IconButton } from "@mui/material";
import Mic from "@mui/icons-material/Mic";
import MicOff from "@mui/icons-material/MicOff";

const MicButton = () => {
  const [MicEnabled, setMicEnabled] = useState(true);

  const handleToggleMic = () => {
    setMicEnabled(!MicEnabled);
  };

  return (
    <IconButton onClick={handleToggleMic} style={{color: 'white'}}>
      {MicEnabled ? <Mic /> : <MicOff />}
    </IconButton>
  );
};

export default MicButton;
