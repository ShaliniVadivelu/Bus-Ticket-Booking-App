import React, { Fragment } from 'react';
// BrowerserRouter is a parent component used to store all of the other components and keep the UI in sync with URL
//Route is a conditionally shown component that renders some UI when its path matches the current URL.
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import UserRegister from './components/auth/UserRegister';
import UserLogin from './components/auth/UserLogin';
import OwnerRegister from './components/auth/OwnerRegister';
import OwnerLogin from './components/auth/OwnerLogin';
import Alert from './components/layout/Alert';
//Redux
//The provider component makes the Redux store available to any nested components that need to access the Redux store.
import { Provider } from 'react-redux';
import store from './store';

import './App.css';

const App = () => (
  <Provider store={store}>
    <Router>
    <Fragment>
      <Navbar />   
      <Route exact path='/' component={Landing} />
        <Alert />
        <Switch>
        <Route exact path='/userregister' component={UserRegister} />
        <Route exact path='/userlogin' component={UserLogin} />
        <Route exact path='/ownerregister' component={OwnerRegister} />
        <Route exact path='/ownerlogin' component={OwnerLogin} />
        </Switch>
    </Fragment>
    </Router>
    </Provider>
);
export default App;

//It is used to define and render component based on the specified path. It will accept components and render to define what should be rendered.