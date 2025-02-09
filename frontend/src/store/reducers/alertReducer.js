import alertActions from "../actions/alertActions";

const initialState = {
  showAlertMessage: false,
  alertMessageContent: null,
//   alertType: null, // can be 'success', 'error', 'warning', etc.
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case alertActions.OPEN_ALERT_MESSAGE:
      return {
        ...state,
        showAlertMessage: true,
        alertMessageContent: action.content,
      };
    case alertActions.CLOSE_ALERT_MESSAGE:
      return {
        ...state,
        showAlertMessage: false,
        alertMessageContent: null,
      };
    default:
      return state;
  };
};

export default alertReducer; 