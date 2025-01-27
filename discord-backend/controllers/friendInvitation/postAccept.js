const FriendInvitation = require("../../models/friendInvitation");
const User = require("../../models/user");
const friendsUpdates = require('../../socketHandlers/updates/friends')

const postAccept = async(req ,res) => {
    try{
        const { id } = req.body;
        const invitation = await FriendInvitation.findById(id);

        if(!invitation){
            return res.status(401).send("Error occured.Please try again!");
        }

        const {senderId , receiverId} = invitation;

        //successfully found the invitation.....users must be friends to each other-------
        const senderUser = await User.findById(senderId);
        senderUser.friends = [...senderUser.friends , receiverId];

        const receiverUser = await User.findById(receiverId);
        receiverUser.friends = [...receiverUser.friends , senderId];

        await senderUser.save();
        await receiverUser.save();

        //after accepting invitation....after adding in friends...delete the invitation
        await FriendInvitation.findByIdAndDelete(id);


        //we should update list of friends if users are online
        friendsUpdates.updateFriends(senderId.toString());
        friendsUpdates.updateFriends(receiverId.toString());

        //user making decisions must update list of frinds pending invitation
        friendsUpdates.updateFriendsPendingInvitations(receiverId.toString());


        return res.status(200).send('Friends successfully added!')

    }catch(err){
        console.log(err);
        return res.status(500).send('Something went wrong .Please try again!')
    }
};


module.exports = postAccept;