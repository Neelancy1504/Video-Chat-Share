const Message = require("../models/message");
const Conversation = require("../models/conversation");
const chatUpdates = require("./updates/chat");

const directMessageHandler = async (socket, data) => {
  try {
    console.log("Event is being handled!");

    const { userId } = socket.user;
    const { receiverUserId, content } = data;

    //create a new messAGE
    const message = await Message.create({
      content: content,
      author: userId,
      date: new Date(),
      type: "DIRECT",
    });

    //find if the conversation already exists
    const conversation = await Conversation.findOne({
      participants: { $all: [userId, receiverUserId] },
    });

    if (conversation) {
      conversation.messages.push(message._id);
      await conversation.save();

      //now perform an update to sender and receiver if is online
      chatUpdates.updateChatHistory(conversation._id.toString());
    } else {
      //add new conversation
      const newConversation = await Conversation.create({
        messages: [message._id],
        participants: [userId, receiverUserId],
      });

      //perform an update to sender and receiver if is online
      chatUpdates.updateChatHistory(newConversation._id.toString());
      
    }
  } catch (err) {
    console.log('Error in directMessageHandler:', err);
  }
};

module.exports = directMessageHandler;
