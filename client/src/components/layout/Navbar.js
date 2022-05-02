import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';

const Navbar = ({ auth: {isAuthenticated, loading}, logout}) => {

    const authLinks =(
        <ul>
            <li>
            <a onClick={logout} href="#!">
            <i a="fas fa-sign-out-alt"></i>{' '}
            <span className="hide-sm">Logout</span> </a>
            </li>
        </ul>
    );

    const guestLinks =(
        <ul>
                <div className="dropdown">
                <button className="dropbtn"> Register <i class="fa fa-caret-down"></i> </button>

                 <div className="dropdown-content">
                    <Link to="/userregister">User</Link>
                    <Link to="/ownerregister">Owner</Link>
                </div> 
                </div>
                
                 <div className="dropdown">
                <button class="dropbtn"> Login <i class="fa fa-caret-down"></i> </button>

                 <div className="dropdown-content">
                    <Link to="/userlogin">User</Link>
                    <Link to="/ownerlogin">Owner</Link>
                </div> 
                </div>
            </ul>
    )
    return (
        <nav className = "navbar bg-dark">
            <h1>
                <Link to ="/">
                <i class="fa fa-bus"></i> Happy Bus!
                </Link>
            </h1>
            {!loading && (<Fragment> { isAuthenticated ? authLinks : guestLinks }</Fragment>)}

        </nav>
    )
}

Navbar.propTypes ={
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state  => ({
    auth: state.auth
})
export default connect(mapStateToProps, {logout}) (Navbar);