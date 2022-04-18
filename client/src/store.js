//store is a state container that helps to specify the app's state. store cane be created using createStore method form redux.x`
import { createStore, applyMiddleware} from 'redux';
// Chrome based extension that provides a console where we can setup our dev env with redux.
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
// index.js file which is a root reducer.
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store= createStore(
    //returns the nextstate of the app
    rootReducer,
    //initial state of the app
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
    );

export default store;