import React from 'react';
import {Link} from 'react-router-dom';

const Landing =() => {
    return (
        <section className="landing">
          <div className="landing-inner">
           <h1 className="x-large">Safety! Healthy! Happy! travel with <h1 className="large">Happy Bus</h1></h1>
            <p className="mainlead">
              Our website will help you to book a bus ticket for personal and official use.
            </p>
          {/* <div className="buttons">
            <Link className="btn btn-primary" to="/register"> Sign Up </Link>
            <Link className="btn btn-light" to="/login"> Login </Link>
          </div> */}
        </div>  
    </section>
    )
}

export default Landing;
