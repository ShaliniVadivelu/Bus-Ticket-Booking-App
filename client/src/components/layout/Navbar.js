import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className = "navbar bg-dark">
            <h1>
                <Link to ="/">
                <i class="fa fa-bus"></i> Happy Bus!
                </Link>
            </h1>
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

        </nav>
    )
}

export default Navbar