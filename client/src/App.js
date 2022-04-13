import React, { Fragment } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import UserRegister from './components/auth/UserRegister';
import UserLogin from './components/auth/UserLogin';
import OwnerRegister from './components/auth/OwnerRegister';
import OwnerLogin from './components/auth/OwnerLogin';

import './App.css';

const App = () => (
    <Router>
    <Fragment>
      <Navbar />   
      <Route exact path='/' component={Landing} />
      <section className ='container'>
        <Switch>
        <Route exact path='/userregister' component={UserRegister} />
        <Route exact path='/userlogin' component={UserLogin} />
        <Route exact path='/ownerregister' component={OwnerRegister} />
        <Route exact path='/ownerlogin' component={OwnerLogin} />
        </Switch>
      </section>
    </Fragment>
    </Router>
);
export default App;
