import axios from 'axios';
import {userAuthenticated} from '../app/authenticationSlice';


const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Authentication`,
    headers: {
        'Content-Type': 'application/json',
    }
})

export const SignUp = async (dispatch, credentials) => {
    try {
        const { data } = await axiosInstance.post('/signup', credentials);
        dispatch(userAuthenticated(data));
        return { success: true };
    } catch (error) {
        // Return the error response status to handle it in the component
        if (error.response) {
            return { success: false, status: error.response.status };
        } else {
            return { success: false, status: null };
        }
    }
};


export const SignIn = async (dispatch, credentials) => {
    try {
        const { data } = await axiosInstance.post('/signin', credentials);
        dispatch(userAuthenticated(data));
        return { success: true };
    } catch (error) {
        // Handle the error and return the status
        if (error.response) {
            return { success: false, status: error.response.status };
        } else {
            return { success: false, status: null };
        }
    }
};

export default axiosInstance;