import { openAlertMessage } from "./alertActions";
import * as api from "../../api";

export const friendsActions = {
  SET_FRIENDS: "FRIENDS.SET_FRIENDS",
  SET_PENDING_FRIENDS_INVITATIONS: "FRIENDS.SET_PENDING_FRIENDS_INVITATIONS",
  SET_ONLINE_USERS: "FRIENDS.SET_ONLINE_USERS",
};

export const getActions = (dispatch) => {
  return {
    sendFriendInvitation: (data, closeDialogHandler) =>
      dispatch(sendFriendInvitation(data, closeDialogHandler)),
    acceptFriendInvitation: (data) => dispatch(acceptFriendInvitation(data)),
    rejectFriendInvitation: (data) => dispatch(rejectFriendInvitation(data)),
  };
};

export const setPendingFriendsInvitations = (pendingFriendsInvitations) => {
  return {
    type: friendsActions.SET_PENDING_FRIENDS_INVITATIONS,
    pendingFriendsInvitations,
  };
};

export const setFriends = (friends) => {
  return {
    type: friendsActions.SET_FRIENDS,
    friends,
  };
};

export const setOnlineUsers = (onlineUsers) => {
  return {
    type: friendsActions.SET_ONLINE_USERS,
    onlineUsers,
  };
};

const sendFriendInvitation = (data, closeDialogHandler) => {
  return async (dispatch) => {
    const response = await api.sendFriendInvitation(data);

    if (response.error) {
      dispatch(openAlertMessage(response.exception?.response?.data));
    } else {
      dispatch(openAlertMessage("Invitation has been sent!"));
      closeDialogHandler();
    }
  };
};

const acceptFriendInvitation = (data) => {
  return async (dispatch) => {
    const response = await api.acceptFriendInvitation(data);

    if (response.error) {
      dispatch(openAlertMessage(response.exception?.response?.data));
    } else {
      dispatch(openAlertMessage("Invitation accepted!"));
    }
  };
};

const rejectFriendInvitation = (data) => {
  return async (dispatch) => {
    const response = await api.rejectFriendInvitation(data);

    if (response.error) {
      dispatch(openAlertMessage(response.exception?.response?.data));
    } else {
      dispatch(openAlertMessage("Invitation rejected!"));
    }
  };
};


// import * as api from '../../api';
// import { openAlertMessage } from './alertActions';

// export const friendsActions = {
//     SET_FRIENDS:'FRIENDS.SET_FRIENDS',
//     SET_PENDING_FRIENDS_INVITATIONS:'FRIENDS.SET_PENDING_FRIENDS_INVITATIONS',
//     SET_ONLINE_USERS:'FRIENDS.SET_ONLINE_USERS',
// }

// export const getActions = (dispatch) =>{
//     return {
//         sendFriendInvitation: (data,closeDialogHandler) => 
//         dispatch(sendFriendInvitation(data,closeDialogHandler)),

//         acceptFriendInvitation:(data) =>dispatch(acceptFriendInvitation(data)),
//         rejectFriendInvitation:(data) =>dispatch(rejectFriendInvitation(data)),

//     }
// }



// export const setPendingFriendsInvitation = (pendingFriendsInvitations) =>{
//     return{
//         type:friendsActions.SET_PENDING_FRIENDS_INVITATIONS,
//         pendingFriendsInvitations
//     }
// }


// export const setFriends = (friends) =>{
//     return{
//         type:friendsActions.SET_FRIENDS,
//         friends
//     }
// }

// export const setOnlineUsers = (onlineUsers) =>{
//     return{
//         type:friendsActions.SET_ONLINE_USERS,
//         onlineUsers
//     }
// }

// const sendFriendInvitation = (data,closeDialogHandler) => {
//     return async (dispatch) =>{
//         const response = await api.sendFriendInvitation(data);
        
//         if(response.error){
//             dispatch(openAlertMessage(response.exception?.response?.data));
//         }
//         else
//         {
//             dispatch(openAlertMessage('Invitation has been sent!'));
//             closeDialogHandler();
//         }
//     }
// }

// const acceptFriendInvitation = (data)=>{
//     return async (dispatch) =>{
//         const response = await api.acceptFriendInvitation(data);
//         if(response.error){
//             dispatch(openAlertMessage(response.exception?.response?.data));
//         }
//         else
//         {
//             dispatch(openAlertMessage('Invitation Accepted!'));
//         }
//     }
// }

// const rejectFriendInvitation = (data)=>{
//     return async (dispatch) =>{
//         const response = await api.rejectFriendInvitation(data);
//         if(response.error){
//             dispatch(openAlertMessage(response.exception?.response?.data));
//         }
//         else
//         {
//             dispatch(openAlertMessage('Invitation Rejected!'));
//         }
//     }
// }

// // import {openAlertMessage} from './alertActions';
// // import * as api from '../../api';

// // export const friendsActions = {
// //     SET_FRIENDS: 'FRIENDS.SET_FRIENDS',
// //     SET_PENDING_FRIENDS_INVITATIONS: 'FRIENDS.SET_PENDING_FRIENDS_INVITATIONS',
// //     SET_ONLINE_USERS: 'FRIENDS.SET_ONLINE_USERS',
// // };

// // // Separate media stream management
// // // let activeMediaStreams = new Map();

// // // // Helper to handle media streams outside Redux
// // // export const mediaStreamManager = {
// // //     setStream: (userId, stream) => {
// // //         activeMediaStreams.set(userId, stream);
// // //     },
// // //     getStream: (userId) => activeMediaStreams.get(userId),
// // //     removeStream: (userId) => {
// // //         const stream = activeMediaStreams.get(userId);
// // //         if (stream) {
// // //             stream.getTracks().forEach(track => track.stop());
// // //             activeMediaStreams.delete(userId);
// // //         }
// // //     },
// // //     cleanup: () => {
// // //         activeMediaStreams.forEach(stream => {
// // //             stream.getTracks().forEach(track => track.stop());
// // //         });
// // //         activeMediaStreams.clear();
// // //     }
// // // };

// // export const getActions = (dispatch) => {
// //     return {
// //         sendFriendInvitation: (data, closeDialogHandler) => 
// //             dispatch(sendFriendInvitation(data, closeDialogHandler)),
// //         acceptFriendInvitation: (data) => dispatch(acceptFriendInvitation(data)),
// //         rejectFriendInvitation: (data) => dispatch(rejectFriendInvitation(data))
// //     };
// // };

// // export const setPendingFriendsInvitations = (pendingFriendsInvitations) => ({
// //     type: friendsActions.SET_PENDING_FRIENDS_INVITATIONS,
// //     pendingFriendsInvitations,
// // });

// // export const setFriends = (friends) => ({
// //     type: friendsActions.SET_FRIENDS,
// //     friends,
// // });

// // // Modified to handle MediaStream objects properly
// // // export const setOnlineUsers = (onlineUsers) => {
// // //     // Transform the data to ensure it's serializable
// // //     const serializableUsers = onlineUsers.map(user => {
// // //         if (user.remoteStreams) {
// // //             // Store stream in manager and only keep reference
// // //             user.remoteStreams.forEach((stream, index) => {
// // //                 const streamId = `${user.id}-${index}`;
// // //                 mediaStreamManager.setStream(streamId, stream);
// // //                 return streamId;
// // //             });
// // //         }
// // //         return user;
// // //     });

// // //     return {
// // //         type: friendsActions.SET_ONLINE_USERS,
// // //         onlineUsers: serializableUsers,
// // //     };
// // // };
// // export const setOnlineUsers = (onlineUsers) => {
// //     return {
// //       type: friendsActions.SET_ONLINE_USERS,
// //       payload: onlineUsers.map(user => ({
// //         ...user,
// //         localStream: undefined, // Exclude MediaStream from Redux state
// //       })),
// //     };
// //   };
  

// // export const sendFriendInvitation = (data, closeDialogHandler) => {
// //     return async (dispatch) => {
// //         try {
// //             const response = await api.sendFriendInvitation(data);
            
// //             if (response.error) {
// //                 dispatch(openAlertMessage(response.exception?.response?.data));
// //             } else {
// //                 dispatch(openAlertMessage('Invitation has been sent!'));
// //                 closeDialogHandler();
// //             }
// //         } catch (error) {
// //             dispatch(openAlertMessage('Failed to send invitation'));
// //         }
// //     };
// // };

// // const acceptFriendInvitation = (data) => {
// //     return async (dispatch) => {
// //         try {
// //             const response = await api.acceptFriendInvitation(data);

// //             if (response.error) {
// //                 dispatch(openAlertMessage(response.exception?.response?.data));
// //             } else {
// //                 dispatch(openAlertMessage('Invitation Accepted'));
// //             }
// //         } catch (error) {
// //             dispatch(openAlertMessage('Failed to accept invitation'));
// //         }
// //     };
// // };

// // const rejectFriendInvitation = (data) => {
// //     return async (dispatch) => {
// //         try {
// //             const response = await api.rejectFriendInvitation(data);

// //             if (response.error) {
// //                 dispatch(openAlertMessage(response.exception?.response?.data));
// //             } else {
// //                 dispatch(openAlertMessage('Invitation Rejected'));
// //             }
// //         } catch (error) {
// //             dispatch(openAlertMessage('Failed to reject invitation'));
// //         }
// //     };
// // };

// // // import {openAlertMessage} from './alertActions';
// // // import * as api from '../../api';

// // // export const friendsActions = {
// // //     SET_FRIENDS: 'FRIENDS.SET_FRIENDS',
// // //     SET_PENDING_FRIENDS_INVITATIONS: 'FRIENDS.SET_PENDING_FRIENDS_INVITATIONS',
// // //     SET_ONLINE_USERS: 'FRIENDS.SET_ONLINE_USERS',
// // // };

// // // export const getActions = (dispatch) => {
// // //     return{
// // //         sendFriendInvitation: (data , closeDialogHandler)=> 
// // //             dispatch(sendFriendInvitation(data , closeDialogHandler)),
// // //         acceptFriendInvitation : (data) => dispatch(acceptFriendInvitation(data)),
// // //         rejectFriendInvitation: (data) => dispatch(rejectFriendInvitation(data))
        
// // //     };
// // // };

// // // export const setPendingFriendsInvitations = (pendingFriendsInvitations) => {
// // //     return {
// // //         type: friendsActions.SET_PENDING_FRIENDS_INVITATIONS,
// // //         pendingFriendsInvitations,
// // //     }
// // // }

// // // export const setFriends = (friends) => {
// // //     return {
// // //         type: friendsActions.SET_FRIENDS,
// // //         friends,
// // //     };            
// // // };

// // // export const setOnlineUsers = (onlineUsers) => {
// // //     return{
// // //         type: friendsActions.SET_ONLINE_USERS,
// // //         onlineUsers,
// // //     };
// // // };

// // // export const sendFriendInvitation = (data, closeDialogHandler) => {
// // //     return async (dispatch) => {
// // //         const response = await api.sendFriendInvitation(data);
        
// // //         if (response.error) {
// // //             dispatch(openAlertMessage(response.exception?.response?.data));
// // //         } else {
// // //             dispatch(openAlertMessage('Invitation has been sent!'));
// // //             closeDialogHandler();
// // //         }
// // //     };
// // // };

// // // const acceptFriendInvitation = (data) => {
// // //     return async(dispatch) => {
// // //         const response = await api.acceptFriendInvitation(data);

// // //         if (response.error) {
// // //             dispatch(openAlertMessage(response.exception?.response?.data));
// // //         } else {
// // //             dispatch(openAlertMessage('Invitation Accepted'));
// // //         }
// // //     }
// // // }

// // // const rejectFriendInvitation = (data) => {
// // //     return async(dispatch) => {
// // //         const response = await api.rejectFriendInvitation(data);

// // //         if (response.error) {
// // //             dispatch(openAlertMessage(response.exception?.response?.data));
// // //         } else {
// // //             dispatch(openAlertMessage('Invitation Rejected'));
// // //         }
// // //     }
// // // }