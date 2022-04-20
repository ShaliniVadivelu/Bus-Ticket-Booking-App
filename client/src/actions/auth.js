import axios from 'axios';
import { setAlert } from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    OWNER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL
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

    dispatch(loadUser());
    
}catch (err) {
    const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch (setAlert(error.msg, 'danger')));
        }

    dispatch ({
        type: REGISTER_FAIL
    });
}
};

//Login User
export const userLogin = (email,role,password) => async dispatch =>{
    const config = {
        headers:  {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify ({email,role,password});

try {

    const res = await axios.post('/api/user/login', body, config);

    dispatch ({
        type: LOGIN_SUCCESS,
        payload: res.data
    });

    dispatch(loadUser());
}catch (err) {
    const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch (setAlert(error.msg, 'danger')));
        }

    dispatch ({
        type: LOGIN_FAIL
    });
}
}

// Load owner
export const loadOwner = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken (localStorage.token);
    } 
 
 try {
     const res = await axios.get('/api/auth/owner');
     dispatch ({
         type: OWNER_LOADED,
         payload: res.data
     });
} catch (err) {
    dispatch({
        type: AUTH_ERROR
    });
 }
};

//Register Owner
export const ownerRegister = ({name,email,role,officeAddress,phone,password}) => async dispatch =>{
    const config = {
        headers:  {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify ({name,email,role,officeAddress,phone,password});

try {

    const res = await axios.post('/api/owner', body, config);

    dispatch ({
        type: REGISTER_SUCCESS,
        payload: res.data
    });

    dispatch(loadOwner());
    
}catch (err) {
    const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch (setAlert(error.msg, 'danger')));
        }

    dispatch ({
        type: REGISTER_FAIL
    });
}
};

//Login User
export const ownerLogin = (email,role,password) => async dispatch =>{
    const config = {
        headers:  {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify ({email,role,password});

try {

    const res = await axios.post('/api/owner/login', body, config);

    dispatch ({
        type: LOGIN_SUCCESS,
        payload: res.data
    });

    dispatch(loadUser());
}catch (err) {
    const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch (setAlert(error.msg, 'danger')));
        }

    dispatch ({
        type: LOGIN_FAIL
    });
}
}

