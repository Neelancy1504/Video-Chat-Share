import React from "react";
import { styled } from "@mui/system";
import { connect } from "react-redux";
import Video from "./Video";

const MainContainer = styled("div")({
  height: "85%",
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
});

const VideosContainer = ({
  localStream,
  remoteStreams,
  screenSharingStream,
}) => {
  return (
    <MainContainer>
      <Video
        stream={screenSharingStream ? screenSharingStream : localStream}
        isLocalStream
      />
      {remoteStreams.map((stream) => (
        <Video stream={stream} key={stream.id} />
      ))}
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

export default connect(mapStoreStateToProps)(VideosContainer);


// import React from "react";
// import { styled } from "@mui/material";
// import { connect } from "react-redux";
// import Video from "./Video";

// const MainContainer = styled("div")({
//   height: "85%",
//   width: "100%",
//   display: "flex",
//   flexWrap: "wrap",
//   justifyContent: "center",
//   alignItems: "center",
//   gap: "20px",
// });

// const VideosContainer = ({ localStream, remoteStreams = [] }) => {
//   return (
//     <MainContainer>
//       {localStream && (
//         <Video 
//           stream={localStream} 
//           isLocalStream={true}
//         />
//       )}
//       {remoteStreams.map((stream) => (
//         <Video
//           key={stream.id}
//           stream={stream}
//           isLocalStream={false}
//         />
//       ))}
//     </MainContainer>
//   );
// };

// const mapStoreStateToProps = (state) => ({
//   localStream: state.room.localStream,
//   remoteStreams: state.room.remoteStreams || [],
// });

// export default connect(mapStoreStateToProps)(VideosContainer);