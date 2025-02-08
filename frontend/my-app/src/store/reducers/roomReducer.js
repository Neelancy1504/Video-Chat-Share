import { roomActions } from "../actions/roomActions";

const initState = {
  isUserInRoom: false,
  isUserRoomCreator: false,
  roomDetails: null,
  activeRooms: [],
  localStream: null,
  remoteStreams: [],
  audioOnly: false,
  screenSharingStream: null,
  isScreenSharingActive: false,
  isUserJoinedWithOnlyAudio: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case roomActions.OPEN_ROOM:
      return {
        ...state,
        isUserInRoom: action.isUserInRoom,
        isUserRoomCreator: action.isUserRoomCreator,
      };
    case roomActions.SET_ROOM_DETAILS:
      return {
        ...state,
        roomDetails: action.roomDetails,
      };
    case roomActions.SET_ACTIVE_ROOMS:
      return {
        ...state,
        activeRooms: action.activeRooms,
      };
    case roomActions.SET_LOCAL_STREAM:
      return {
        ...state,
        localStream: action.localStream,
      };
    case roomActions.SET_AUDIO_ONLY:
      return {
        ...state,
        audioOnly: action.audioOnly,
      };
    case roomActions.SET_REMOTE_STREAMS:
      return {
        ...state,
        remoteStreams: action.remoteStreams,
      };
    case roomActions.SET_SCREEN_SHARE_STREAM:
      return {
        ...state,
        screenSharingStream: action.screenSharingStream,
        isScreenSharingActive: action.isScreenSharingActive,
      };
    case roomActions.SET_IS_USER_JOINED_WITH_ONLY_AUDIO:
      return {
        ...state,
        isUserJoinedWithOnlyAudio: action.isUserJoinedWithOnlyAudio,
      };
    default:
      return state;
  }
};

export default reducer;


// import { roomActions } from "../actions/roomActions";

// const initState = {
//   isUserInRoom: false,
//   isUserRoomCreator: false,
//   roomDetails: null,
//   activeRooms: [],
//   localStream: null,
//   remoteStreams: [], // Initialize as empty array instead of undefined
//   audioOnly: false,
//   screenSharingStream: null,
//   isScreenSharingActive: false,
// };

// const reducer = (state = initState, action) => {
//   switch (action.type) {
//     // ... (other cases remain the same)
//     case roomActions.OPEN_ROOM:
//       return {
//         ...state,
//         isUserInRoom: action.isUserInRoom,
//         isUserRoomCreator: action.isUserRoomCreator,
//       };

//     case roomActions.SET_ROOM_DETAILS:
//       return {
//         ...state,
//         roomDetails: action.roomDetails,
//       };

//     case roomActions.SET_ACTIVE_ROOMS:
//       return {
//         ...state,
//         activeRooms: action.activeRooms,
//       };
//       case roomActions.SET_LOCAL_STREAM:
//         return {
//           ...state,
//           localStreamId: action.localStream ? action.localStream.id : null,
//         };

//     case roomActions.SET_AUDIO_ONLY:
//       return {
//         ...state,
//         audioOnly: action.audioOnly,
//       };

//     case roomActions.SET_REMOTE_STREAMS:
//       return {
//         ...state,
//         remoteStreams: action.remoteStreams || [], // Ensure we always have an array
//       };

//     default:
//       return state;
//   }
// };

// export default reducer;


// // import { roomActions } from "../actions/roomActions";
// // // const initState = {
// // //   isUserInRoom: false,
// // //   isUserRoomCreator: false,
// // //   roomDetails: null,
// // //   activeRooms: [],
// // //   localStreamId: null, // Store only an ID or metadata
// // //   remoteStreamIds: [], // Store references or metadata for remote streams
// // //   audioOnly: false,
// // //   screenSharingStreamId: null,
// // //   isScreenSharingActive: false,
// // // };

// // // const reducer = (state = initState, action) => {
// // //   switch (action.type) {
// // //     case roomActions.OPEN_ROOM:
// // //       return {
// // //         ...state,
// // //         isUserInRoom: action.isUserInRoom,
// // //         isUserRoomCreator: action.isUserRoomCreator,
// // //       };

// // //     case roomActions.SET_ROOM_DETAILS:
// // //       return {
// // //         ...state,
// // //         roomDetails: action.roomDetails,
// // //       };

// // //     case roomActions.SET_ACTIVE_ROOMS:
// // //       return {
// // //         ...state,
// // //         activeRooms: action.activeRooms,
// // //       };

// // //     case roomActions.SET_LOCAL_STREAM:
// // //       return {
// // //         ...state,
// // //         localStreamId: action.localStreamId, // Store a reference/ID instead
// // //       };

// // //     case roomActions.SET_AUDIO_ONLY:
// // //       return {
// // //         ...state,
// // //         audioOnly: action.audioOnly,
// // //       };

// // //     default:
// // //       return state;
// // //   }
// // // };

// // // export default reducer;



// // const initState = {
// //   isUserInRoom: false,
// //   isUserRoomCreator: false,
// //   roomDetails: null,
// //   activeRooms: [],
// //   localStream: null, //camera or mic
// //   remoteStream: [], //info about connection with other users
// //   audioOnly: false,
// //   screenSharingStream: null,
// //   isScreenSharingActive: false,
// // };

// // const reducer = (state = initState, action) => {
// //   switch (action.type) {
// //     case roomActions.OPEN_ROOM:
// //       return {
// //         ...state,
// //         isUserInRoom: action.isUserInRoom,
// //         isUserRoomCreator: action.isUserRoomCreator,
// //       };

// //     case roomActions.SET_ROOM_DETAILS:
// //       return {
// //         ...state,
// //         roomDetails: action.roomDetails,
// //       };

// //     case roomActions.SET_ACTIVE_ROOMS:
// //       return {
// //         ...state,
// //         activeRooms: action.activeRooms,
// //       };
// //     case roomActions.SET_LOCAL_STREAM:
// //       return {
// //         ...state,
// //         localStream: action.localStream,
// //       };

// //     case roomActions.SET_AUDIO_ONLY:
// //       return {
// //         ...state,
// //         audioOnly: action.audioOnly,
// //       };

// //     case roomActions.SET_REMOTE_STREAMS:
// //       return {
// //         ...state,
// //         remoteStreams: action.remoteStreams || [],
// //       };
// //     default:
// //       return state;
// //   }
// // };

// // export default reducer;
