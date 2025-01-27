const { v4: uuidv4 } = require("uuid");

// Store connected users
const connectedUsers = new Map();
let activeRooms = [];
let io = null;

const setSocketServerInstance = (ioInstance) => {
  io = ioInstance;
};

const getSocketServerInstance = () => {
  return io;
};

// Add a new connected user
const addNewConnectedUser = ({ socketId, userId }) => {
  connectedUsers.set(socketId, { userId });
  console.log("New connected users:", connectedUsers);
};

// Remove a connected user
const removeConnectedUser = (socketId) => {
  if (connectedUsers.has(socketId)) {
    connectedUsers.delete(socketId);
    console.log("Updated connected users:", connectedUsers);
  }
};

const getActiveConnections = (userId) => {
  const activeConnections = [];
  connectedUsers.forEach((value, key) => {
    if (value.userId === userId) {
      activeConnections.push(key);
    }
  });

  return activeConnections;
};

const getOnlineUsers = () => {
  const onlineUsers = [];
  connectedUsers.forEach((value, key) => {
    onlineUsers.push({ socketId: key, userId: value.userId });
  });

  return onlineUsers;
};

// Add a new active room
const addNewActiveRoom = (userId, socketId) => {
  const newActiveRoom = {
    roomCreator: {
      userId,
      socketId,
    },
    participants: [
      {
        userId,
        socketId,
      },
    ],
    roomId: uuidv4(),
  };

  activeRooms.push(newActiveRoom);

  console.log("New Active Rooms:", activeRooms);

  return newActiveRoom;
};

const getActiveRooms = () => {
  return [...activeRooms];
};

const getActiveRoom = (roomId) => {
  return activeRooms.find((room) => room.roomId === roomId) || null;
};

const joinActiveRoom = (roomId, newParticipant) => {
  const room = activeRooms.find((room) => room.roomId === roomId);

  if (!room) {
    console.log(`Room with ID ${roomId} not found.`);
    return;
  }

  activeRooms = activeRooms.filter((room) => room.roomId !== roomId);

  const updatedRoom = {
    ...room,
    participants: [...room.participants, newParticipant],
  };

  activeRooms.push(updatedRoom);

  console.log("Updated Active Rooms:", activeRooms);
};

const leaveActiveRoom = (roomId, participantSocketId) => {
  const activeRoom = activeRooms.find((room) => room.roomId === roomId);

  if (activeRoom) {
    const copyOfActiveRoom = { ...activeRoom };

    copyOfActiveRoom.participants = copyOfActiveRoom.participants.filter(
      (participant) => participant.socketId !== participantSocketId
    );

    activeRooms = activeRooms.filter((room) => room.roomId !== roomId);

    if (copyOfActiveRoom.participants.length > 0) {
      activeRooms.push(copyOfActiveRoom);
    }
  }
};

module.exports = {
  addNewConnectedUser,
  removeConnectedUser,
  getActiveConnections,
  setSocketServerInstance,
  getSocketServerInstance,
  getOnlineUsers,
  addNewActiveRoom,
  getActiveRooms,
  getActiveRoom,
  joinActiveRoom,
  leaveActiveRoom,
};

// const { v4: uuidv4 } = require("uuid");

// //creates a Map to store connected users.---------------------
// const connectedUsers = new Map();
// let activeRooms = [];
// let io = null;

// const setSocketServerInstance = (ioInstance) => {
//   io = ioInstance;
// };

// const getSocketServerInstance = () => {
//   return io;
// };

// //socketId: Tracks the individual WebSocket connection.
// //userId: Identifies the user associated with the connection.--------------------
// const addNewConnectedUser = ({ socketId, userId }) => {
//   connectedUsers.set(socketId, { userId });
//   console.log("new connected users!!");
//   console.log(connectedUsers);
// };

// const removeConnectedUser = (socketId) => {
//   if (connectedUsers.has(socketId)) {
//     connectedUsers.delete(socketId);
//     console.log("new connected users");
//     console.log(connectedUsers);
//   }
// };

// const getActiveConnections = (userId) => {
//   const activeConnections = [];
//   connectedUsers.forEach(function (value, key) {
//     if (value.userId === userId) {
//       activeConnections.push(key);
//     }
//   });

//   return activeConnections;
// };

// const getOnlineUsers = () => {
//   const onlineUsers = [];
//   connectedUsers.forEach((value, key) => {
//     onlineUsers.push({ socketId: key, userId: value.userId });
//   });

//   return onlineUsers;
// };

// //rooms
// const addNewActiveRoom = (userId, socketId) => {
//   const newActiveRoom = {
//     roomCreator: {
//       userId,
//       socketId,
//     },
//     participants: [
//       {
//         userId,
//         socketId,
//       },
//     ],
//     roomId: uuidv4(),
//   };

//   activeRooms = [...activeRooms, newActiveRoom];

//   console.log("new Active Rooms!");
//   console.log(activeRooms);

//   return newActiveRoom;
// };

// const getActiveRooms = () => {
//   return [...activeRooms];
// };

// const getActiveRoom = (roomId) => {
//   const activeRoom = activeRooms.find(
//     (activeRoom) => activeRoom.roomId === roomId
//   );

//   return {
//     ...activeRoom,
//   };
// };

// const joinActiveRoom = (roomId, newParticipant) => {
//   // Find the room with the given roomId
//   const room = activeRooms.find((room) => room.roomId === roomId);

//   if (!room) {
//     console.log(`Room with ID ${roomId} not found.`);
//     return;
//   }

//   // Remove the existing room from the activeRooms list
//   activeRooms = activeRooms.filter((room) => room.roomId !== roomId);

//   // Create an updated room with the new participant
//   const updatedRoom = {
//     ...room,
//     participants: [...room.participants, newParticipant],
//   };

//   // Add the updated room back to activeRooms
//   activeRooms.push(updatedRoom);

//   console.log("Updated Active Rooms:", activeRooms);
// };


// const leaveActiveRoom = (roomId, participantSocketId) => {
//   const activeRoom = activeRooms.find(room => room.roomId === roomId);

//   if (activeRoom) {
//     const copyOfActiveRoom = { ...activeRoom };

//     // Filter out the participant who is leaving
//     copyOfActiveRoom.participants = copyOfActiveRoom.participants.filter(
//       (participant) => participant.socketId !== participantSocketId
//     );

//     // Remove the old room from the list
//     activeRooms = activeRooms.filter((room) => room.roomId !== roomId);

//     // Only add the room back if it still has participants
//     if (copyOfActiveRoom.participants.length > 0) {
//       activeRooms.push(copyOfActiveRoom);
//     }
//   }
// };


// module.exports = {
//   addNewConnectedUser,
//   removeConnectedUser,
//   getActiveConnections,
//   setSocketServerInstance,
//   getSocketServerInstance,
//   getOnlineUsers,
//   addNewActiveRoom,
//   getActiveRooms,
//   getActiveRoom,
//   joinActiveRoom,
//   leaveActiveRoom,
// };

