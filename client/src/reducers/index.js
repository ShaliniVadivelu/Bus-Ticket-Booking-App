//rootReducers
import { combineReducers } from "redux";
import alert from './alert';

//The combineReducers helper function turns an object whose values are different reducing functions into a single reducing function you can pass to createStore. reducers called as reducing fn used to reduce the collection of values down to single value
export default combineReducers ({
    alert 
});