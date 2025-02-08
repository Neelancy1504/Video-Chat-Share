const serverStore = require("../serverStore");
const roomsUpdate = require("./updates/rooms");

const roomLeaveHandler = (socket, data) => {
  const { roomId } = data;

  const activeRoom = serverStore.getActiveRoom(roomId);

  if (activeRoom) {
    serverStore.leaveActiveRoom(roomId, socket.id);

    const updatedActiveRoom = serverStore.getActiveRoom(roomId);

    if (updatedActiveRoom) {
      updatedActiveRoom.participants.forEach((participant) => {
        socket.to(participant.socketId).emit("room-participant-left", {
          connUserSocketId: socket.id,
        });
      });
    }

    roomsUpdate.updateRooms();
  }
};

module.exports = roomLeaveHandler;


// const serverStore = require("../serverStore");
// const roomsUpdate = require("./updates/rooms");

// const roomLeaveHandler = (socket, data) => {
//   const { roomId } = data;

//   const activeRoom = serverStore.getActiveRoom(roomId);

//   if (activeRoom) {
//     serverStore.leaveActiveRoom(roomId, socket.id);

//     const updatedActiveRoom = serverStore.getActiveRoom(roomId);

//     if (updatedActiveRoom) {
//       updatedActiveRoom.participants.forEach((participant) => {
//         socket.to(participant.socketId).emit("room-participant-left", {
//           connUserSocketId: socket.id,
//         });
//       });
//     }

//     roomsUpdate.updateRooms();
//   }
// };

// module.exports = roomLeaveHandler;



// // const serverStore = require("../serverStore"); // Import serverStore for room management
// // const roomsUpdate = require("./updates/rooms"); // Import for broadcasting room updates

// // const roomLeaveHandler = (socket, data) => {
// //   const { roomId } = data; // Extract roomId from the incoming data
// //   const activeRoom = serverStore.getActiveRoom(roomId); // Retrieve the active room using the roomId

// //   if (activeRoom) {
// //     const isCreatorLeaving = activeRoom.roomCreator.socketId === socket.id; // Check if the leaving user is the creator
// //     const io = serverStore.getSocketServerInstance(); // Get the socket.io server instance

// //     if (isCreatorLeaving) {
// //       if (activeRoom.participants.length === 1) {
// //         // If the creator is the only participant, close the room
// //         serverStore.leaveActiveRoom(roomId, socket.id); // Remove the room from activeRooms
// //         io.to(roomId).emit("room-closed"); // Notify the creator's front-end to remove the container
// //         console.log(
// //           `Room with ID ${roomId} has been closed as the creator left.`
// //         );
// //       } else {
// //         // If other participants are in the room, update the room
// //         serverStore.leaveActiveRoom(roomId, socket.id);
// //         const updatedParticipants = activeRoom.participants.filter(
// //           (participant) => participant.socketId !== socket.id
// //         );

// //         io.to(roomId).emit("room-updated", {
// //           participants: updatedParticipants,
// //         }); // Notify participants
// //         console.log(
// //           `Creator left room ${roomId}. Remaining participants:`,
// //           updatedParticipants
// //         );
// //       }
// //     } else {
// //       // If a regular participant is leaving
// //       serverStore.leaveActiveRoom(roomId, socket.id); // Remove the participant
// //       const updatedParticipants = activeRoom.participants.filter(
// //         (participant) => participant.socketId !== socket.id
// //       );
// //       if (updatedParticipants.length > 0) {
// //         // Notify remaining participants about the updated list
// //         io.to(roomId).emit("room-updated", {
// //           participants: updatedParticipants,
// //         });
// //       } else {
// //         // If no participants are left, close the room
// //         serverStore.leaveActiveRoom(roomId, socket.id);
// //         io.to(roomId).emit("room-closed");
// //       }
// //       console.log(
// //         `Participant with socket ID ${socket.id} left room ${roomId}.`
// //       );
// //     }

// //     if (updatedActiveRoom) {
// //       updatedActiveRoom.participants.forEach((participant) => {
// //         socket.to(participant.socketId).emit("room-participant-left", {
// //           connUserSocketId: socket.id,
// //         });
// //       });
// //     }
// //     // // Broadcast updated room list to all connected clients
// //     roomsUpdate.updateRooms();
// //   }
// // };

// // module.exports = roomLeaveHandler;
