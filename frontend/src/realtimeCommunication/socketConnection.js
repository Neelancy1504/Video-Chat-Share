import io from "socket.io-client";
import {
  setPendingFriendsInvitations,
  setFriends,
  setOnlineUsers,
} from "../store/actions/friendsActions";
import store from "../store/store";
import { updateDirectChatHistoryIfActive } from "../shared/utils/chat";
import * as roomHandler from "./roomHandler";
import * as webRTCHandler from "./webRTCHandler";

let socket = null;

export const connectWithSocketServer = (userDetails) => {
  const jwtToken = userDetails.token;

  socket = io("https://video-chat-share.onrender.com", {
    auth: {
      token: jwtToken,
    },
  });

  socket.on("connect", () => {
    console.log("succesfully connected with socket.io server");
    console.log(socket.id);
  });

  socket.on("friends-invitations", (data) => {
    const { pendingInvitations } = data;
    store.dispatch(setPendingFriendsInvitations(pendingInvitations));
  });

  socket.on("friends-list", (data) => {
    const { friends } = data;
    store.dispatch(setFriends(friends));
  });

  socket.on("online-users", (data) => {
    const { onlineUsers } = data;
    store.dispatch(setOnlineUsers(onlineUsers));
  });

  socket.on("direct-chat-history", (data) => {
    console.log(data);
    updateDirectChatHistoryIfActive(data);
  });

  socket.on("room-create", (data) => {
    roomHandler.newRoomCreated(data);
  });

  socket.on("active-rooms", (data) => {
    roomHandler.updateActiveRooms(data);
  });

  socket.on("conn-prepare", (data) => {
    const { connUserSocketId } = data;
    webRTCHandler.prepareNewPeerConnection(connUserSocketId, false);
    socket.emit("conn-init", { connUserSocketId: connUserSocketId });
  });

  socket.on("conn-init", (data) => {
    const { connUserSocketId } = data;
    webRTCHandler.prepareNewPeerConnection(connUserSocketId, true);
  });

  socket.on("conn-signal", (data) => {
    webRTCHandler.handleSignalingData(data);
  });

  socket.on("room-participant-left", (data) => {
    console.log("user left room");
    webRTCHandler.handleParticipantLeftRoom(data);
  });
};

export const sendDirectMessage = (data) => {
  console.log(data);
  socket.emit("direct-message", data);
};

export const getDirectChatHistory = (data) => {
  socket.emit("direct-chat-history", data);
};

export const createNewRoom = () => {
  socket.emit("room-create");
};

export const joinRoom = (data) => {
  socket.emit("room-join", data);
};

export const leaveRoom = (data) => {
  socket.emit("room-leave", data);
};

export const signalPeerData = (data) => {
  socket.emit("conn-signal", data);
};


// import io from "socket.io-client";
// import {
//   setPendingFriendsInvitation,
//   setFriends,
//   setOnlineUsers,
// } from "../store/actions/friendsActions";
// import store from "../store/store";
// import { updateDirectChatHistoryIfActive } from "../shared/utils/chat";
// import * as roomHandler from "./roomHandler";
// import * as webRTCHandler from "../realtimeCommunication/webRTCHandler";

// let socket = null;

// export const getSocket = () => socket;

// export const connectWithSocketServer = (userDetails) => {
//   const jwtToken = userDetails.token;

//   socket = io("http://localhost:5002", {
//     auth: {
//       token: jwtToken,
//     },
//     transports: ['websocket'],
//     forceNew: true,
//     reconnection: true,
//     closeOnBeforeunload: false
//   });

//   socket.on("connect", () => {
//     console.log("successfully connected with socket.io server");
//     console.log(socket.id);
//   });

//   socket.on("friends-invitations", (data) => {
//     const { pendingInvitations } = data;
//     store.dispatch(setPendingFriendsInvitation(pendingInvitations));
//   });

//   socket.on("friends-list", (data) => {
//     const { friends } = data;
//     store.dispatch(setFriends(friends));
//   });

//   socket.on("online-users", (data) => {
//     const { onlineUsers } = data;
//     store.dispatch(setOnlineUsers(onlineUsers));
//   });

//   socket.on("direct-chat-history", (data) => {
//     console.log(data);
//     updateDirectChatHistoryIfActive(data);
//   });

//   socket.on("room-create", (data) => {
//     roomHandler.newRoomCreated(data);
//   });

//   socket.on("active-rooms", (data) => {
//     roomHandler.updateActiveRooms(data);
//   });

//   socket.on("conn-prepare", (data) => {
//     const { connUserSocketId } = data;
//     webRTCHandler.prepareNewPeerConnection(connUserSocketId, false);
//     socket.emit("conn-init", { connUserSocketId: connUserSocketId });
//   });

//   socket.on("conn-init", (data) => {
//     const { connUserSocketId } = data;
//     webRTCHandler.prepareNewPeerConnection(connUserSocketId, true);
//   });

//   socket.on("conn-signal", (data) => {
//     webRTCHandler.handleSignalingData(data);
//   });

//   socket.on("room-participant-left", (data) => {
//     console.log("user left room");
//     webRTCHandler.handleParticipantLeftRoom(data);
//   });

//   socket.on("room-participant-left" , (data) => {
//     console.log("User left the room");
//     webRTCHandler.handleParticipantLeftRoom(data);
//   });

//   return socket;
// };

// export const sendDirectMessage = (data) => {
//   const currentSocket = getSocket();
//   if (currentSocket) {
//     currentSocket.emit("direct-message", data);
//   }
// };

// export const getDirectChatHistory = (data) => {
//   socket.emit("direct-chat-history", data);
// };

// export const createNewRoom = () => {
//   socket.emit("room-create");
// };

// export const joinRoom = (data) => {
//   const currentSocket = getSocket();
//   if (currentSocket) {
//     currentSocket.emit("room-join", data);
//   }
// };

// export const cleanupSocketConnection = () => {
//   if (socket) {
//     socket.disconnect();
//     socket = null;
//   }
// };

// export const leaveRoom = (data) => {
//   const currentSocket = getSocket();
//   if (currentSocket) {
//     currentSocket.emit("room-leave", data);
//   }
// };

// export const signalPeerData = (data) => {
//   const currentSocket = getSocket();
//   if (currentSocket) {
//     currentSocket.emit("conn-signal", data);
//   }
// };