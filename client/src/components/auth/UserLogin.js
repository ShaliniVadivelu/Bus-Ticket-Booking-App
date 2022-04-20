import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {userLogin} from '../../actions/auth';

// useState is a hook which allows us to have a state variable in functional components and it returns a pair: one is a current state value and a function that lets us update it.

const UserLogin = ({userLogin}) => {
    // formData is a state(which has field values) and setFormData is a fn used to udpate the state values
    const [formData, setFormData] = useState({
        email : '',
        role: '',
        password : ''
    });

    const {email,role,password}=formData;

    const onChange =e => setFormData({...formData, [e.target.name]: e.target.value});

     const onSubmit = async e => {
         e.preventDefault();
         console.log(formData);
            userLogin(email,role,password);
     };

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
                Don't have an account? <Link to='/userregister'>Sign Up</Link>
            </p>
            
        </div>
        </Fragment>
    )
};

UserLogin.propTypes = {
    userLogin : PropTypes.func.isRequired
}
export default connect(null, {userLogin}) (UserLogin);