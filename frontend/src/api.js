import axios from "axios";
import { logout } from "./shared/utils/auth";

const apiClient = axios.create({
    baseURL: 'https://video-chat-share-jzxy.vercel.app/', // Corrected key to 'baseURL'
    timeout: 1000, // Request timeout in milliseconds
    headers: {
        'Content-Type': 'application/json', // Ensure JSON request
    },
});

apiClient.interceptors.request.use((config) => {
    const userDetails = localStorage.getItem('user');

    if(userDetails){
        const token = JSON.parse(userDetails).token;
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

//public routes-----------------

// Function to handle login requests
export const login = async (data) => {
    try {
        const response = await apiClient.post('/api/auth/login', data);
        return response.data; // Return response data directly
    } catch (exception) {
        return {
            error: true,
            exception,
        };
    }
};

// Function to handle registration requests
export const register = async (data) => {
    try {
        const response = await apiClient.post('/api/auth/register', data);
        return response.data; // Return response data directly
    } catch (exception) {
        return {
            error: true,
            exception,
        };
    }
};

//secured routes-----------------
export const sendFriendInvitation = async (data) => {
    try {
        const response = await apiClient.post('/api/friend-invitation/invite', data);
        return response.data;  // Return response data directly like other routes
    } catch (exception) {
        checkResponseCode(exception);
        return {
            error: true,
            exception,
        };
    }
};

export const acceptFriendInvitation = async(data) => {
    try{
        return await apiClient.post('/api/friend-invitation/accept' , data);
    }
    catch(exception){
        checkResponseCode(exception);
        return{
            error: true,
            exception,
        }
    };
};

export const rejectFriendInvitation = async(data) => {
    try{
        return await apiClient.post('/api/friend-invitation/reject' , data);
    }
    catch(exception){
        checkResponseCode(exception);
        return{
            error: true,
            exception,
        }
    }
}


const checkResponseCode = (exception) => {
    const responseCode = exception?.response?.status;

    if(responseCode){
        (responseCode === 401 || responseCode === 403) && logout();
    };
};
