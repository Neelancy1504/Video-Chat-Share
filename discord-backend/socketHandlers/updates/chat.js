const Conversation = require("../../models/conversation");
const serverStore = require("../../serverStore");

// const updateChatHistory = async (
//   conversationId,
//   toSpecificedSocketId = null
// ) => {
//   const conversation = await Conversation.findById(conversationId).populate({
//     path: "messages",
//     model: "Message",
//     populate: {
//       path: "author",
//       model: "User",
//       select: "username _id",
//     },
//   });

//   if (conversation) {
//     const io = serverStore.getSocketServerInstance();

//     if (toSpecificedSocketId) {
//       // Initial update of chat HISTORY
//       return io.to(toSpecificedSocketId).emit("direct-chat-history", {
//         messages: conversation.messages,
//         participants: conversation.participants,
//       });
//     }

//     //check users of this conversation online?
//     //if yes emit to them update of messages

//     conversation.participants.forEach((userId) => {
//       const activeConnections = serverStore.getActiveConnections(
//         userId.toString()
//       );

//       activeConnections.forEach(socketId => {
//         io.to(socketId).emit("direct-chat-history", {
//           messages: conversation.messages,
//           participants: conversation.participants,
//         });
//       });
//     });
//   }
// };

const updateChatHistory = async (
  conversationId,
  toSpecificedSocketId = null,
  isInitialLoad = false
) => {
  const conversation = await Conversation.findById(conversationId).populate({
    path: "messages",
    model: "Message",
    populate: {
      path: "author",
      model: "User",
      select: "username _id",
    },
  });

  if (conversation) {
    const io = serverStore.getSocketServerInstance();

    const payload = {
      messages: conversation.messages,
      participants: conversation.participants,
      isInitialLoad, // Add this flag to distinguish the context
    };

    if (toSpecificedSocketId) {
      return io.to(toSpecificedSocketId).emit("direct-chat-history", payload);
    }

    conversation.participants.forEach((userId) => {
      const activeConnections = serverStore.getActiveConnections(
        userId.toString()
      );

      activeConnections.forEach((socketId) => {
        io.to(socketId).emit("direct-chat-history", payload);
      });
    });
  }
};


module.exports = { updateChatHistory };
