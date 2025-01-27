const Conversation = require("../models/conversation");
const chatUpdates = require("./updates/chat");

// const directChatHistoryHandler = async (socket, data) => {
//   try {
//     const { userId } = socket.user;
//     const { receiverUserId } = data;

//     const conversation = await Conversation.findOne({
//       participants: { $all: [userId, receiverUserId] },
//       type: "DIRECT",
//     });

//     if (conversation) {
//       chatUpdates.updateChatHistory(conversation._id.toString(), socket.id);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// module.exports = directChatHistoryHandler;


const directChatHistoryHandler = async (socket, data) => {
  try {
    const { userId } = socket.user;
    const { receiverUserId } = data;

    const conversation = await Conversation.findOne({
      participants: { $all: [userId, receiverUserId] },
    });

    if (conversation) {
      // Emit chat history with an additional flag
      chatUpdates.updateChatHistory(
        conversation._id.toString(),
        socket.id,
        true // Mark as initial load
      );
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = directChatHistoryHandler;
