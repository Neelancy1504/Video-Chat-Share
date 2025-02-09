import React, { useEffect, useRef } from "react";
import { styled } from "@mui/system";

const MainContainer = styled("div")({
  height: "50%",
  width: "50%",
  backgroundColor: "black",
  borderRadius: "8px",
});

const VideoEl = styled("video")({
  width: "100%",
  height: "100%",
});

const Video = ({ stream, isLocalStream }) => {
  const videoRef = useRef();

  useEffect(() => {
    const video = videoRef.current;
    video.srcObject = stream;

    video.onloadedmetadata = () => {
      video.play();
    };
  }, [stream]);

  return (
    <MainContainer>
      <VideoEl ref={videoRef} autoPlay muted={isLocalStream ? true : false} />
    </MainContainer>
  );
};

export default Video;



// import React, { useRef, useEffect } from "react";
// import { styled } from "@mui/material";

// const MainContainer = styled("div")({
//   height: "50%",
//   width: "50%",
//   backgroundColor: "black",
//   borderRadius: "8px",
// });

// const VideoEl = styled("video")({
//   width: "100%",
//   height: "100%",
//   objectFit: "cover",
// });

// const Video = ({ stream, isLocalStream }) => {
//   const videoRef = useRef();

//   useEffect(() => {
//     const video = videoRef.current;
    
//     if (stream) {
//       console.log(`Setting up ${isLocalStream ? 'local' : 'remote'} video stream:`, stream);
//       video.srcObject = stream;
      
//       video.onloadedmetadata = () => {
//         console.log("Video metadata loaded, attempting to play");
//         video.play().catch(err => {
//           console.error("Error playing video:", err);
//         });
//       };
//     } else {
//       console.log(`No ${isLocalStream ? 'local' : 'remote'} stream provided`);
//     }

//     return () => {
//       if (video.srcObject) {
//         console.log("Cleaning up video stream");
//         const tracks = video.srcObject.getTracks();
//         tracks.forEach(track => {
//           track.stop();
//           track.enabled = false;
//         });
//         video.srcObject = null;
//       }
//     };
//   }, [stream, isLocalStream]);

//   return (
//     <MainContainer>
//       <VideoEl
//         ref={videoRef}
//         autoPlay
//         playsInline
//         muted={isLocalStream}
//         id={isLocalStream ? 'localVideo' : `remoteVideo_${stream?.id}`}
//       />
//     </MainContainer>
//   );
// };

// export default Video;