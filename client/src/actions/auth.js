import axios from 'axios';
import { setAlert } from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load user
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken (localStorage.token);
    } 
 
 try {
     const res = await axios.get('/api/auth/basic');
     dispatch ({
         type: USER_LOADED,
         payload: res.data
     });
} catch (err) {
    dispatch({
        type: AUTH_ERROR
    });
 }
};

//Register User
export const userRegister = ({name,email,role,phone,gender,dob,address,password}) => async dispatch =>{
    const config = {
        headers:  {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify ({name,email,role,phone,gender,dob,address,password});

try {

    const res = await axios.post('/api/user', body, config);

    dispatch ({
        type: REGISTER_SUCCESS,
        payload: res.data
    });

}catch (err) {
    const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch (setAlert(error.msg, 'danger')));
        }

    dispatch ({
        type: REGISTER_FAIL
    });
}
}