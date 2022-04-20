import React, {Fragment, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';

import {connect} from 'react-redux';
import { setAlert } from '../../actions/alert';
import { ownerRegister } from '../../actions/auth';
import PropTypes from 'prop-types';
    
const OwnerRegister = ({setAlert, ownerRegister, isAuthenticated}) => {
    const [formData, setFormData] = useState ({
            companyName: '',
            officeAddress: '',
            phone: '',
            email: '',  
            role: '',
            password: '',
            password2: ''
    });

    const {companyName,officeAddress,role,phone,email,password,password2} = formData;

    //using spread operator to copy the formData
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        //we cannot return false to prevent default behaviour in react. we have to call it explicitly
        //e-> synthetic event
        e.preventDefault();
        if(password !== password2){
           setAlert('Passwords do not match','danger');
        }
        else
        {
            ownerRegister({companyName,officeAddress,role,phone,email,password});
        }
    }

     // Redirect if logged in 
     if (isAuthenticated) {
        return <Redirect to ='/ownerDashboard'/>
    }

    return (
        <Fragment> 
            <div className='BgPic'></div>
            <div className='bg-text'>
             <h1 className='largee text-primary'>Sign Up</h1>

            <p className='lead'><i className='fas fa-user'></i>&nbsp;Create your Account</p> 

            <form className='form' onSubmit ={e =>onSubmit(e)}>
                
                <div className='form-group'>

                    <input 
                        type='text' 
                        placeholder='Company Name' 
                        name='companyName' 
                        value={companyName}
                        onChange={(e => onChange(e))} 
                    />
                </div>

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
                        type='tel' 
                        placeholder='Contact Number' 
                        name='phone' 
                        value={phone}
                        onChange={(e => onChange(e))} 
                    />
                </div>

                <div className='form-group'>
                    <textarea
                        type='text'
                        name='officeAddress'
                        cols='30'
                        rows='3'
                        placeholder='Add a Company Address'
                        value={officeAddress}
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

                <div className='form-group'>
                <input
                    type='password' 
                    placeholder='Confirm Password'
                    name='password2'
                    value={password2} 
                    onChange= {e=> onChange(e)}
                    />
                </div>

                <input type='submit' className='btn btn-primary' value='Register' />
            </form>

            <p className='my-1'>
                Already have an account? <Link to='/ownerlogin'>Sign In</Link>
            </p>
            </div>
        </Fragment>
    )
};

OwnerRegister.propTypes = {
    setAlert: PropTypes.func.isRequired,
    ownerRegister: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(
    mapStateToProps,
    {setAlert, ownerRegister}
    )
    (OwnerRegister);