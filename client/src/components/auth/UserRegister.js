import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';

//The connect() function connects a React component to a Redux store.
import {connect} from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';

// useState is a hook which allows us to have a state variable in functional components and it returns a pair: one is a current state value and a function that lets us update it.

const UserRegister = ({setAlert}) => {

// formData is a current state(which has field values) and setFormData is a fn used to udpate the state values
const [formData, setFormData] = useState({
    //passing the default objects as name....all empty in the inital(initial state)
    name : '',
    email : '',
    role: '',
    phone: '',
    gender: '',
    password : '',
    password2 : '' 
});

// pulling all the info from formData
    const {name,email,role,phone,gender,dob,text,password,password2}=formData;

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
            console.log(formData);
         }
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
                        placeholder='Name' 
                        name='name' 
                        value={name}
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
                        placeholder='Phone Number' 
                        name='phone' 
                        value={phone}
                        onChange={(e => onChange(e))} 
                    />
                </div>

                {/* <div className='form-group'>
                    <div className='check'>
                <input 
                    type='radio' 
                    name='gender' 
                    value={gender}
                    onChange={(e => onChange(e))} 
                    />
                    Male &nbsp; 
                <input 
                    type='radio' 
                    name='gender' 
                    value={gender}
                    onChange={(e => onChange(e))} 
                    />
                    Female 
                    </div>
                </div> */}

                <div className='form-group'>
                    <input 
                        type='gender' 
                        placeholder='DOB' 
                        name='gender' 
                        value={gender}
                        onChange={(e => onChange(e))} 
                    />
                </div>

                <div className='form-group'>
                    <input 
                        type='date' 
                        placeholder='DOB' 
                        name='dob' 
                        value={dob}
                        onChange={(e => onChange(e))} 
                    />
                </div>

                <div className='form-group'>
                    <textarea
                        name='text'
                        cols='30'
                        rows='3'
                        placeholder='Add a Address'
                        value={text}
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
                Already have an account? <Link to='/userlogin'>Sign In</Link>
            </p>
            </div>
        </Fragment>
    )
};

UserRegister.propTypes = {
    setAlert: PropTypes.func.isRequired
}

export default connect(null, {setAlert})(UserRegister);