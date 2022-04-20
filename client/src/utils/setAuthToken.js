//created a utils folder to use a global header
import axios from 'axios';

const setAuthToken = token => {
    //if there is a token, set a global header
    if (token) {
        axios.defaults.headers.common ['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common ['x-auth-token'];
    }
}

export default setAuthToken;