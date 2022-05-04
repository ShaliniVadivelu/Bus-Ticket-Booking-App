import axios from 'axios';
import { setAlert } from "./alert";

import {
    GET_PROFILE,
    PROFILE_ERROR
} from './types';

// Get current owner profile
export const getOwnerProfile = () => async dispatch => {

    try {
        const res = await axios.get('/api/owner/me/:id'); 

        dispatch ({
            type: GET_PROFILE,
            payload: res.data
        });

    } catch (err) {

        dispatch ({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
        
    }

}