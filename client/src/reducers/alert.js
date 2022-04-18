import { SET_ALERT, REMOVE_ALERT} from '../actions/types';

//inital state will be emtpy
const initialState =[];

export default function(state = initialState, action) {
    //action will contain 2 mandatory things one is type and payload(data)
    const { type, payload } = action;

    switch (type) {
        case SET_ALERT: 
        return [...state, payload];
        case REMOVE_ALERT:
            return state.filter(alert =>alert.id !== payload);
        default:
            return state;
    }
}