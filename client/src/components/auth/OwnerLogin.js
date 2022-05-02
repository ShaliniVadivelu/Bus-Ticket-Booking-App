import React, {Fragment, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';

import {connect} from 'react-redux';
import { ownerLogin } from '../../actions/auth';
import PropTypes from 'prop-types';
    
const OwnerLogin = ({ownerLogin, isAuthenticated}) => {
    //formData is the statevariable
    const [formData, setFormData] = useState ({
        email: '',
        role: '' ,
        password: ''
    });
    
    const {email,role,password} = formData;

    //using spread operator to copy the formData
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        //we cannot return false to prevent default behaviour in react. we have to call preventDefault() method explicitly
        //e-> synthetic event
        e.preventDefault();
         console.log(formData);
            ownerLogin(email,role,password);
    }

     // Redirect if logged in 
     if (isAuthenticated) {
        return <Redirect to ='/ownerDashboard' />
    }

    return (
        <Fragment> 
            <div className='BgPic'></div>

            <div className='bg-text'>
            
            <h1 className='largee text-primary'>Sign In</h1>

            <p className='lead'><i className='fas fa-user'></i>&nbsp;Sign in to your account</p>

            <form className='form' onSubmit ={e =>onSubmit(e)}>

                <div className='form-group'>
                    <input 
                        type='email' 
                        placeholder='Email Address' 
                        name='email' 
                        value={email}
                        onChange={(e => onChange(e))} 
                    />
                </div>

                <div className='form-group'>
                <input 
                        type='role' 
                        placeholder='role' 
                        name='role' 
                        value={role}
                        onChange={(e => onChange(e))} 
                    />
                </div>

                <div className='form-group'>
                <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    value={password} 
                    onChange= {e=> onChange(e)}
                    />
                </div>

                <input type='submit' className='btn btn-primary' value='Login' />
            </form>

            <p className='my-1'>
                Don't have an account? <Link to='/ownerregister'>Sign Up</Link>
            </p>
            
        </div>
        </Fragment>
    )
};

OwnerLogin.propTypes = {
    ownerLogin: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {ownerLogin}) (OwnerLogin);