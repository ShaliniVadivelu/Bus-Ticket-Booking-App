import axios from 'axios';
import { setAlert } from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../actions/types';

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