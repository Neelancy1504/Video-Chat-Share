import store from "../store/store";
import { setLocalStream, setRemoteStreams } from "../store/actions/roomActions";
import Peer from "simple-peer";
import * as socketConnection from "./socketConnection";

const getConfiguration = () => {
  const turnIceServers = null;

  if (turnIceServers) {
    // TODO use TURN server credentials
  } else {
    console.warn("Using only STUN server");
    return {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    };
  }
};

const onlyAudioConstraints = {
  audio: true,
  video: false,
};

const defaultConstraints = {
  video: true,
  audio: true,
};

export const getLocalStreamPreview = (onlyAudio = false, callbackFunc) => {
  const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      store.dispatch(setLocalStream(stream));
      callbackFunc();
    })
    .catch((err) => {
      console.log(err);
      console.log("Cannot get an access to local stream");
    });
};

let peers = {};

export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
  const localStream = store.getState().room.localStream;

  if (isInitiator) {
    console.log("preparing new peer connection as initiator");
  } else {
    console.log("preparing new peer connection as not initiator");
  }

  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: getConfiguration(),
    stream: localStream,
  });

  peers[connUserSocketId].on("signal", (data) => {
    const signalData = {
      signal: data,
      connUserSocketId: connUserSocketId,
    };

    socketConnection.signalPeerData(signalData);
  });

  peers[connUserSocketId].on("stream", (remoteStream) => {
    // TODO
    // add new remote stream to our server store
    console.log("remote stream came from other user");
    console.log("direct connection has been established");
    remoteStream.connUserSocketId = connUserSocketId;
    addNewRemoteStream(remoteStream);
  });
};

export const handleSignalingData = (data) => {
  const { connUserSocketId, signal } = data;

  if (peers[connUserSocketId]) {
    peers[connUserSocketId].signal(signal);
  }
};

const addNewRemoteStream = (remoteStream) => {
  const remoteStreams = store.getState().room.remoteStreams;
  const newRemoteStreams = [...remoteStreams, remoteStream];

  store.dispatch(setRemoteStreams(newRemoteStreams));
};

export const closeAllConnections = () => {
  Object.entries(peers).forEach((mappedObject) => {
    const connUserSocketId = mappedObject[0];
    if (peers[connUserSocketId]) {
      peers[connUserSocketId].destroy();
      delete peers[connUserSocketId];
    }
  });
};

export const handleParticipantLeftRoom = (data) => {
  const { connUserSocketId } = data;

  if (peers[connUserSocketId]) {
    peers[connUserSocketId].destroy();
    delete peers[connUserSocketId];
  }

  const remoteStreams = store.getState().room.remoteStreams;

  const newRemoteStreams = remoteStreams.filter(
    (remoteStream) => remoteStream.connUserSocketId !== connUserSocketId
  );

  store.dispatch(setRemoteStreams(newRemoteStreams));
};

export const switchOutgoingTracks = (stream) => {
  for (let socket_id in peers) {
    for (let index in peers[socket_id].streams[0].getTracks()) {
      for (let index2 in stream.getTracks()) {
        if (
          peers[socket_id].streams[0].getTracks()[index].kind ===
          stream.getTracks()[index2].kind
        ) {
          peers[socket_id].replaceTrack(
            peers[socket_id].streams[0].getTracks()[index],
            stream.getTracks()[index2],
            peers[socket_id].streams[0]
          );
          break;
        }
      }
    }
  }
};


// import store from "../store/store";
// import { setLocalStream, setRemoteStreams } from "../store/actions/roomActions";
// import Peer from "simple-peer";
// import * as socketConnection from "./socketConnection";

// const getConfiguration = () => {
//   const turnIceServers = null;

//   if (turnIceServers) {
//     // TODO use TURN server credentials
//   } else {
//     console.warn("Using only STUN server");
//     return {
//       iceServers: [
//         {
//           urls: "stun:stun.l.google.com:19302",
//         },
//       ],
//     };
//   }
// };

// export const getLocalStreamPreview = (onlyAudio = false, callbackFunc) => {
//   const constraints = onlyAudio
//     ? {
//         audio: true,
//         video: false,
//       }
//     : {
//         audio: true,
//         video: true,
//       };

//   navigator.mediaDevices
//     .getUserMedia(constraints)
//     .then((stream) => {
//       console.log("Local stream obtained:", stream);
//       store.dispatch(setLocalStream(stream));

//       // Verify stream was dispatched
//       const storeState = store.getState();
//       console.log("Store state after dispatch:", storeState.room.localStream);

//       if (callbackFunc) {
//         callbackFunc();
//       }
//     })
//     .catch((err) => {
//       console.error("Error accessing media devices:", err);
//       if (err.name === "NotAllowedError") {
//         console.error("Camera/Microphone permission denied");
//       } else if (err.name === "NotFoundError") {
//         console.error("No camera/microphone found");
//       }
//     });
// };

// let peers = {};

// export const handleSignalingData = (data) => {
//   const { connUserSocketId, signal } = data;

//   if (peers[connUserSocketId]) {
//     peers[connUserSocketId].signal(signal);
//   }
// };

// let activeStreams = new Map();

// export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
//   const localStream = store.getState().room.localStream;

//   if (!localStream) {
//     console.error("No local stream available");
//     return;
//   }

//   console.log("Creating peer connection with stream:", localStream);

//   peers[connUserSocketId] = new Peer({
//     initiator: isInitiator,
//     config: getConfiguration(),
//     stream: localStream,
//     trickle: true,
//   });

//   peers[connUserSocketId].on("signal", (data) => {
//     const signalData = {
//       signal: data,
//       connUserSocketId: connUserSocketId,
//     };

//     socketConnection.signalPeerData(signalData);
//   });

//   peers[connUserSocketId].on("stream", (remoteStream) => {
//     console.log("Remote stream received:", remoteStream);
//     remoteStream.connUserSocketId = connUserSocketId;
//     addNewRemoteStream(remoteStream);
//   });
// };

// const addNewRemoteStream = (remoteStream) => {
//   const streamId = remoteStream.id;
//   activeStreams.set(streamId, remoteStream);

//   const streamInfo = {
//     id: streamId,
//     connUserSocketId: remoteStream.connUserSocketId,
//   };

//   const currentRemoteStreams = store.getState().room.remoteStreams || [];
//   const newRemoteStreams = [...currentRemoteStreams, streamInfo];

//   store.dispatch(setRemoteStreams(newRemoteStreams));
// };

// export const getStream = (streamId) => {
//   return activeStreams.get(streamId);
// };

// export const closeAllConnections = () => {
//   Object.entries(peers).forEach((mappedObject) => {
//     const connUserSocketId = mappedObject[0];
//     if (peers[connUserSocketId]) {
//       peers[connUserSocketId].destroy();
//       delete peers[connUserSocketId];
//     }
//   });
// };

// export const handleParticipantLeftRoom = (data) => {
//   const { connUserSocketId } = data;

//   // Cleanup peer connection
//   if (peers[connUserSocketId]) {
//     peers[connUserSocketId].destroy();
//     delete peers[connUserSocketId];
//   }

//   // Clean up remote video
//   // const remoteVideo = document.getElementById(`remoteVideo_${connUserSocketId}`);
//   // if (remoteVideo && remoteVideo.srcObject) {
//   //   const tracks = remoteVideo.srcObject.getTracks();
//   //   tracks.forEach(track => {
//   //     track.stop();
//   //     track.enabled = false;
//   //   });
//   //   remoteVideo.srcObject = null;
//   // }

//   // const currentRemoteStreams = store.getState().room.remoteStreams || [];
//   // const newRemoteStreams = currentRemoteStreams.filter(
//   //   stream => stream.connUserSocketId !== connUserSocketId
//   // );

//   // store.dispatch(setRemoteStreams(newRemoteStreams));

//   //course
//   const remoteStreams = store.getState().room.remoteStreams;

//   const newRemoteStreams = remoteStreams.filter(
//     (remoteStream) => remoteStream.connUserSocketId !== connUserSocketId
//   );

//   store.dispatch(setRemoteStreams(newRemoteStreams));
// };

// // Clean up function
// export const cleanupLocalVideo = () => {
//   const localVideoElement = document.getElementById("localVideo");
//   if (localVideoElement && localVideoElement.srcObject) {
//     const tracks = localVideoElement.srcObject.getTracks();
//     tracks.forEach((track) => {
//       track.stop();
//       track.enabled = false;
//     });
//     localVideoElement.srcObject = null;
//   }
// };

// export const cleanupWebRTC = () => {
//   activeStreams.clear();
// };

// export const switchOutgoingTracks = (stream) => {
//   for (let socket_id in peers) {
//     for (let index in peers[socket_id].streams[0].getTracks()) {
//       for (let index2 in stream.getTracks()) {
//         if (
//           peers[socket_id].streams[0].getTracks()[index].kind ===
//           stream.getTracks()[index2].kind
//         ) {
//           peers[socket_id].replaceTrack(
//             peers[socket_id].streams[0].getTracks()[index],
//             stream.getTracks()[index2],
//             peers[socket_id].streams[0]
//           );
//           break;
//         }
//       }
//     }
//   }
// };
