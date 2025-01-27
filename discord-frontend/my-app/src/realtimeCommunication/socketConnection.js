import io from "socket.io-client";
import {
  setPendingFriendsInvitations,
  setFriends,
  setOnlineUsers,
} from "../store/actions/friendsActions";
import store from "../store/store";
import { updateDirectChatHistoryIfActive } from "../shared/utils/chat";
import * as roomHandler from './roomHandler';
import { setActiveRooms } from "../store/actions/roomActions";
import * as webRTCHandler from './webRTCHandler';

let socket = null;

export const connectWithSocketServer = (userDetails) => {
  const jwtToken = userDetails.token;

  socket = io("http://localhost:5002", {
    auth: {
      token: jwtToken,
    },
  });

  socket.on("connect", () => {
    console.log("successfully connected with sockte.io server");
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
    updateDirectChatHistoryIfActive(data);

    if (data.isInitialLoad) {
      console.log("Loaded previous chat history from server:", data);
      // Handle the display of initial chat history
    } else {
      console.log("New direct message update from server:", data);
      // Handle appending new messages
    }
  });

  socket.on("room-create", (data) => {
    console.log('created room details came from the server')
    console.log(data);
    roomHandler.newRoomCreated(data);
  });

  // socket.on('active-rooms' ,data => {
  //   roomHandler.updateActiveRooms(data);
  // })
  socket.on('active-rooms', (data) => {
    const { activeRooms } = data;
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
  });

  socket.on('conn-prepare' , (data) => {
    console.log('prepare for connection!');
    console.log(data);
    const {connUserSocketId} = data;
    webRTCHandler.prepareNewPeerConnection(connUserSocketId , false);
    socket.emit('conn-init' , { connUserSocketId : connUserSocketId});
  });

  socket.on('conn-init' , (data) => {
    const  {connUserSocketId } = data;
    webRTCHandler.prepareNewPeerConnection(connUserSocketId , true);
  });

  socket.on('conn-signal' , data => {
    webRTCHandler.handleSignalingData(data);
  })
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

export const joinRoom = (data) =>{
  socket.emit('room-join', data);
}; 

export const leaveRoom = (data) => {
  socket.emit('room-leave' , data);
};

export const signalPeerData = (data) => {
  socket.emit('conn-signal' , data);
};



