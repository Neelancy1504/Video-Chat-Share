import store from "../store/store";
import { setLocalStream , setRemoteStreams } from "../store/actions/roomActions";
import Peer from "simple-peer";
import * as socketConnection from "./socketConnection";

const getConfiguration = () => {
  const turnIceServers = null;
  if (turnIceServers) {
    //todo use TURN server credentials
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

// export const getLocalStreamPreview = (onlyAudio = false, callbackFunc) => {
//   const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;

//   navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
//     store.dispatch(setLocalStream(stream));
//     callbackFunc();
//   }).catch(err => {
//     console.log(err);
//     console.log('Cannot get an access to LocalStream!')
//   })
// };

export const getLocalStreamPreview = (onlyAudio = false, callbackFunc) => {
  const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      // Dispatch the local stream
      store.dispatch(setLocalStream(stream));
      // Execute the callback
      callbackFunc();
    })
    .catch((err) => {
      console.error("Cannot access local stream:", err);
    });
};

let peers = {};

export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
  const localStream = store.getState().room.localStream;

  if (isInitiator) {
    console.log("preparing new peer connection as initiator");
  } else {
    console.log("preparing new peer connection as not initiator!");
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

    //pass signaling data to other users
    //socketConnection.signalPeerData(signalData);
  });

  peers[connUserSocketId].on("stream", (remoteStream) => {
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

const addNewRemoteStream = (data) => {
  const { remoteStream } = data;
  
  // Ensure remoteStreams is always an array
  const remoteStreams = store.getState().room.remoteStreams || [];
  
  // Create a new array with the new stream
  const newRemoteStreams = [...remoteStreams, remoteStream];
  
  store.dispatch(setRemoteStreams(newRemoteStreams));
};
