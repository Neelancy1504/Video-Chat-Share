import store from "../store/store";
import {
  setOpenRoom,
  setRoomDetails,
  setActiveRooms,
  setLocalStream,
  setRemoteStreams,
  setScreenSharingStream,
  setIsUserJoinedOnlyWithAudio,
} from "../store/actions/roomActions";
import * as socketConnection from "./socketConnection";
import * as webRTCHandler from "./webRTCHandler";

export const createNewRoom = () => {
  const successCalbackFunc = () => {
    store.dispatch(setOpenRoom(true, true));

    const audioOnly = store.getState().room.audioOnly;
    store.dispatch(setIsUserJoinedOnlyWithAudio(audioOnly));
    socketConnection.createNewRoom();
  };

  const audioOnly = store.getState().room.audioOnly;
  webRTCHandler.getLocalStreamPreview(audioOnly, successCalbackFunc);
};

export const newRoomCreated = (data) => {
  const { roomDetails } = data;
  store.dispatch(setRoomDetails(roomDetails));
};

export const updateActiveRooms = (data) => {
  const { activeRooms } = data;

  const friends = store.getState().friends.friends;
  const rooms = [];

  const userId = store.getState().auth.userDetails?._id;

  activeRooms.forEach((room) => {
    const isRoomCreatedByMe = room.roomCreator.userId === userId;

    if (isRoomCreatedByMe) {
      rooms.push({ ...room, creatorUsername: "Me" });
    } else {
      friends.forEach((f) => {
        if (f.id === room.roomCreator.userId) {
          rooms.push({ ...room, creatorUsername: f.username });
        }
      });
    }
  });

  store.dispatch(setActiveRooms(rooms));
};

export const joinRoom = (roomId) => {
  const successCalbackFunc = () => {
    store.dispatch(setRoomDetails({ roomId }));
    store.dispatch(setOpenRoom(false, true));
    const audioOnly = store.getState().room.audioOnly;
    store.dispatch(setIsUserJoinedOnlyWithAudio(audioOnly));
    socketConnection.joinRoom({ roomId });
  };

  const audioOnly = store.getState().room.audioOnly;
  webRTCHandler.getLocalStreamPreview(audioOnly, successCalbackFunc);
};

export const leaveRoom = () => {
  const roomId = store.getState().room.roomDetails.roomId;

  const localStream = store.getState().room.localStream;
  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop());
    store.dispatch(setLocalStream(null));
  }

  const screenSharingStream = store.getState().room.screenSharingStream;
  if (screenSharingStream) {
    screenSharingStream.getTracks().forEach((track) => track.stop());
    store.dispatch(setScreenSharingStream(null));
  }

  store.dispatch(setRemoteStreams([]));
  webRTCHandler.closeAllConnections();

  socketConnection.leaveRoom({ roomId });
  store.dispatch(setRoomDetails(null));
  store.dispatch(setOpenRoom(false, false));
};



// import store from "../store/store";
// import {
//   setOpenRoom,
//   setRoomDetails,
//   setActiveRooms,
//   setLocalStream,
//   setRemoteStreams,
//   setScreenSharingStream,
//   setIsUserJoinedOnlyWithAudio,
// } from "../store/actions/roomActions";
// import * as socketConnection from "./socketConnection";
// import * as webRTCHandler from "./webRTCHandler";

// export const createNewRoom = () => {
//   const successCalbackFunc = () => {
//     store.dispatch(setOpenRoom(true, true));

//     const audioOnly = store.getState().room.audioOnly;
//     store.dispatch(setIsUserJoinedOnlyWithAudio(audioOnly));
//     socketConnection.createNewRoom();
//   };

//   const audioOnly = store.getState().room.audioOnly;
//   webRTCHandler.getLocalStreamPreview(audioOnly, successCalbackFunc);
// };

// export const newRoomCreated = (data) => {
//   const { roomDetails } = data;
//   store.dispatch(setRoomDetails(roomDetails));
// };

// export const updateActiveRooms = (data) => {
//   const { activeRooms } = data;

//   const friends = store.getState().friends.friends;
//   const rooms = [];

//   const userId = store.getState().auth.userDetails?._id;

//   activeRooms.forEach((room) => {
//     const isRoomCreatedByMe = room.roomCreator.userId === userId;

//     if (isRoomCreatedByMe) {
//       rooms.push({ ...room, creatorUsername: "Me" });
//     } else {
//       friends.forEach((f) => {
//         if (f.id === room.roomCreator.userId) {
//           rooms.push({ ...room, creatorUsername: f.username });
//         }
//       });
//     }
//   });

//   store.dispatch(setActiveRooms(rooms));
// };

// export const joinRoom = (roomId) => {
//   const successCalbackFunc = () => {
//     store.dispatch(setRoomDetails({ roomId }));
//     store.dispatch(setOpenRoom(false, true));
//     const audioOnly = store.getState().room.audioOnly;
//     store.dispatch(setIsUserJoinedOnlyWithAudio(audioOnly));
//     socketConnection.joinRoom({ roomId });
//   };

//   const audioOnly = store.getState().room.audioOnly;
//   webRTCHandler.getLocalStreamPreview(audioOnly, successCalbackFunc);
// };

// export const leaveRoom = () => {
//   const roomId = store.getState().room.roomDetails.roomId;

//   const localStream = store.getState().room.localStream;
//   if (localStream) {
//     localStream.getTracks().forEach((track) => track.stop());
//     store.dispatch(setLocalStream(null));
//   }

//   const screenSharingStream = store.getState().room.screenSharingStream;
//   if (screenSharingStream) {
//     screenSharingStream.getTracks().forEach((track) => track.stop());
//     store.dispatch(setScreenSharingStream(null));
//   }

//   store.dispatch(setRemoteStreams([]));
//   webRTCHandler.closeAllConnections();

//   socketConnection.leaveRoom({ roomId });
//   store.dispatch(setRoomDetails(null));
//   store.dispatch(setOpenRoom(false, false));
// };


// // import {
// //   setOpenRoom,
// //   setRoomDetails,
// //   setActiveRooms,
// //   setLocalStream,
// //   setRemoteStreams,
// // } from "../store/actions/roomActions";
// // import store from "../store/store";
// // import * as socketConnection from "./socketConnection";
// // import * as webRTCHandler from "../realtimeCommunication/webRTCHandler";

// // export const createNewRoom = () => {
// //   const successCallbackFunc = () => {
// //     store.dispatch(setOpenRoom(true, true));
    
// //     // Check if socket is connected before creating room
// //     if (socketConnection.getSocket()?.connected) {
// //       socketConnection.createNewRoom();
// //     } else {
// //       console.error("Socket not connected. Cannot create room.");
// //     }
// //   };

// //   const audioOnly = store.getState().room.audioOnly;
// //   webRTCHandler.getLocalStreamPreview(audioOnly, successCallbackFunc);
// // };

// // export const newRoomCreated = (data) => {
// //   const { roomDetails } = data;
// //   store.dispatch(setRoomDetails(roomDetails));
// // };

// // export const updateActiveRooms = (data) => {
// //   const { activeRooms } = data;
// //   console.log("new active rooms came from server");
// //   console.log(activeRooms);

// //   const friends = store.getState().friends.friends;
// //   const rooms = [];

// //   activeRooms.forEach((room) => {
// //     friends.forEach((f) => {
// //       if (f.id === room.roomCreator.userId) {
// //         rooms.push({ ...room, creatorUsername: f.username });
// //       }
// //     });
// //   });

// //   store.dispatch(setActiveRooms(rooms));
// // };

// // export const joinRoom = (roomId) => {
// //   const successCallbackFunc = () => {
// //     store.dispatch(setRoomDetails({ roomId }));
// //     store.dispatch(setOpenRoom(false, true));
    
// //     if (socketConnection.getSocket()?.connected) {
// //       socketConnection.joinRoom({ roomId });
// //     } else {
// //       console.error("Socket not connected. Cannot join room.");
// //     }
// //   };

// //   const audioOnly = store.getState().room.audioOnly;
// //   webRTCHandler.getLocalStreamPreview(audioOnly, successCallbackFunc);
// // };


// // const mediaStreams = {}; // Store streams outside Redux

// // export const setUserStream = (userId, stream) => {
// //   mediaStreams[userId] = stream;
// // };

// // export const getUserStream = (userId) => {
// //   return mediaStreams[userId] || null;
// // };


// // export const leaveRoom = () => {
// //   const roomId = store.getState().room.roomDetails.roomId;
// //   const localStream = store.getState().room.localStream;

// //   if (localStream) {
// //     try {
// //       // Stop all tracks from local stream
// //       localStream.getTracks().forEach((track) => {
// //         track.stop();
// //         track.enabled = false;
// //       });

// //       // Clean up local video element
// //       const localVideoElement = document.getElementById('localVideo');
// //       if (localVideoElement) {
// //         localVideoElement.srcObject = null;
// //       }

// //       // Clean up all remote video elements
// //       const remoteVideos = document.querySelectorAll('[id^="remoteVideo_"]');
// //       remoteVideos.forEach(video => {
// //         if (video.srcObject) {
// //           const tracks = video.srcObject.getTracks();
// //           tracks.forEach(track => {
// //             track.stop();
// //             track.enabled = false;
// //           });
// //           video.srcObject = null;
// //         }
// //       });

// //       store.dispatch(setLocalStream(null));
// //     } catch (error) {
// //       console.error("Error while stopping media tracks:", error);
// //     }
// //   }

// //   // Handle WebRTC cleanup
// //   if (webRTCHandler && typeof webRTCHandler.cleanupLocalVideo === "function") {
// //     webRTCHandler.cleanupLocalVideo();
// //   }

// //   store.dispatch(setRemoteStreams([]));
// //   webRTCHandler.closeAllConnections();

// //   // Leave room via socket connection
// //   socketConnection.leaveRoom({ roomId });

// //   // Reset room details and close the room
// //   store.dispatch(setRoomDetails(null));
// //   store.dispatch(setOpenRoom(false, false));
// // };

