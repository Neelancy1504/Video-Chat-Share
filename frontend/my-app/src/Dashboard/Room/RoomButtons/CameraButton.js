import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";

const CameraButton = ({ localStream }) => {
  const [cameraEnabled, setCameraEnabled] = useState(true);

  const handleToggleCamera = () => {
    localStream.getVideoTracks()[0].enabled = !cameraEnabled;
    setCameraEnabled(!cameraEnabled);
  };

  return (
    <IconButton onClick={handleToggleCamera} style={{ color: "white" }}>
      {cameraEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
    </IconButton>
  );
};

export default CameraButton;


// // import React, { useState } from "react";
// // import { IconButton } from "@mui/material";
// // import Videocam from "@mui/icons-material/Videocam";
// // import VideocamOff from "@mui/icons-material/VideocamOff";

// // const CameraButton = ({localStream}) => {
// //   const [cameraEnabled, setCameraEnabled] = useState(true);

// //   const handleToggleCamera = () => {
// //     localStream.getVideoTracks()[0].enabled = !cameraEnabled;
// //     setCameraEnabled(!cameraEnabled);
// //   };

// //   return (
// //     <IconButton onClick={handleToggleCamera} style={{color: 'white'}}>
// //       {cameraEnabled ? <Videocam /> : <VideocamOff />}
// //     </IconButton>
// //   );
// // };

// // export default CameraButton;


// import React, { useState, useEffect } from "react";
// import { IconButton } from "@mui/material";
// import Videocam from "@mui/icons-material/Videocam";
// import VideocamOff from "@mui/icons-material/VideocamOff";

// const CameraButton = ({ localStream }) => {
//   const [cameraEnabled, setCameraEnabled] = useState(true);

//   useEffect(() => {
//     // Set initial camera state based on stream
//     if (localStream && localStream.getVideoTracks().length > 0) {
//       setCameraEnabled(localStream.getVideoTracks()[0].enabled);
//     }
//   }, [localStream]);

//   const handleToggleCamera = () => {
//     if (localStream && localStream.getVideoTracks().length > 0) {
//       const videoTrack = localStream.getVideoTracks()[0];
//       videoTrack.enabled = !videoTrack.enabled;
//       setCameraEnabled(videoTrack.enabled);
//     }
//   };

//   return (
//     <IconButton 
//       onClick={handleToggleCamera} 
//       style={{ color: 'white' }}
//       disabled={!localStream || localStream.getVideoTracks().length === 0}
//     >
//       {cameraEnabled ? <Videocam /> : <VideocamOff />}
//     </IconButton>
//   );
// };

// export default CameraButton;