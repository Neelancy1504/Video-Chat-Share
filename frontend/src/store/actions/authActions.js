import * as api from "../../api";
import {openAlertMessage}  from "./alertActions";

export const authActions = {
  SET_USER_DETAILS: "AUTH.SET_USER_DETAILS",
};

export const getActions = (dispatch) => {
  return {
    login: (userDetails, navigate) => dispatch(login(userDetails, navigate)),
    register: (userDetails, navigate) =>
      dispatch(register(userDetails, navigate)),
    setUserDetails: (userDetails) => dispatch(setUserDetails(userDetails)),
  };
};

const setUserDetails = (userDetails) => {
    return {
        type: authActions.SET_USER_DETAILS,
        userDetails,
    };
};

const login = (userDetails, navigate) => {
  return async (dispatch) => {
    const response = await api.login(userDetails);
    console.log(response);
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      if (!response) {
        throw new Error('No data received from server');
      }

      localStorage.setItem('user', JSON.stringify(response.userDetails));
      dispatch(setUserDetails(response.userDetails));
      navigate('/dashboard', { replace: true });
    }
  };
};

const register = (userDetails, navigate) => {
  return async (dispatch) => {
    const response = await api.register(userDetails);
    console.log(response);
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      if (!response) {
        throw new Error('No data received from server');
      }

      localStorage.setItem('user', JSON.stringify(response.userDetails));
      dispatch(setUserDetails(response.userDetails));
      navigate("/dashboard");
    }
  };
};
