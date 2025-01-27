import {
  setOpenRoom,
  setRoomDetails,
  setActiveRooms,
  setLocalStream,
} from "../store/actions/roomActions";
import store from "../store/store";
import * as socketConnection from "./socketConnection";
import * as webRTCHandler from './webRTCHandler';

export const createNewRoom = () => {
  const audioOnly = store.getState().room.audioOnly; // Ensure correct state is fetched
  const successCallbackFunc = () => {
    store.dispatch(setOpenRoom(true, true));
    socketConnection.createNewRoom();
  };
  webRTCHandler.getLocalStreamPreview(audioOnly, successCallbackFunc);
};

export const newRoomCreated = (data) => {
  const { roomDetails } = data;
  store.dispatch(setRoomDetails(roomDetails));
};

export const updateActiveRooms = (data) => {
  const { activeRooms } = data;
  console.log("new active rooms came from server");
  console.log(activeRooms);

  const friends = store.getState().friends.friends;
  const rooms = [];

  activeRooms.forEach((room) => {
    friends.forEach((f) => {
      if (f.id === room.roomCreator.userId) {
        rooms.push({ ...room, creatorUsername: f.username });
      }
    });
  });

  store.dispatch(setActiveRooms(rooms));
};

// export const joinRoom = (roomId) => {
//   const successCallbackFunc = () => {
//     store.dispatch(setRoomDetails({ roomId }));
//     store.dispatch(setOpenRoom(false, true));
//     socketConnection.joinRoom({ roomId });
//   };
  
//   const audioOnly = store.getState().room.audioOnly;
//   webRTCHandler.getLocalStreamPreview(audioOnly, successCallbackFunc);
// };

export const joinRoom = (roomId) => {
  const audioOnly = store.getState().room.audioOnly; // Ensure correct state is fetched
  const successCallbackFunc = () => {
    store.dispatch(setRoomDetails({ roomId }));
    store.dispatch(setOpenRoom(false, true));
    socketConnection.joinRoom({ roomId });
  };
  webRTCHandler.getLocalStreamPreview(audioOnly, successCallbackFunc);
};

// export const leaveRoom = () => {
//   const roomId = store.getState().room.roomDetails.roomId;

//   const localStream = store.getState().room.localStream;
//   if (localStream) {
//     // Stop tracks without mutating the state
//     localStream.getTracks().forEach(track => track.stop());
//     // Dispatch action to reset localStream to null
//     store.dispatch(setLocalStream(null)); // Ensure this action does not mutate the state
//   }

//   socketConnection.leaveRoom({ roomId });
//   store.dispatch(setRoomDetails(null));
//   store.dispatch(setOpenRoom(false, false));
// }

export const leaveRoom = () => {
  const state = store.getState();
  const roomId = state.room.roomDetails?.roomId;
  const localStream = state.room.localStream;

  // Ensure the stream is handled immutably
  if (localStream) {
    // Dispatch action to reset localStream to null immutably before modifying it
    store.dispatch(setLocalStream(null));

    // Stop tracks from the original localStream safely after Redux state update
    localStream.getTracks().forEach((track) => track.stop());
  }

  if (roomId) {
    // Notify server about leaving the room
    socketConnection.leaveRoom({ roomId });
  }

  // Reset room details and close the room
  store.dispatch(setRoomDetails(null));
  store.dispatch(setOpenRoom(false, false));
};

