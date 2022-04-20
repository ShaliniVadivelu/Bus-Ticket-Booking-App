//when we loged out the account and go back to the page we can see the previous datas, but this should not happen. To avoid this we have create a private route
import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// rest operator, it will take anything was passed in
const PrivateRoute = ( { component : Component, 
    auth: { isAuthenticated, loading},
    ...rest 
}) => (
    <Fragment>
    <Route 
        { ...rest} 
        render = { props=> 
            !isAuthenticated && !loading ? (
                <Redirect to='/userLogin' />
                ) : (
                    <Component {...props} />
                    )
        } 
    />

    <Route 
        { ...rest} 
        render = { props=> 
            !isAuthenticated && !loading ? (
                <Redirect to='/ownerLogin' />
                ) : (
                    <Component {...props} />
                    )
        } 
    />
    </Fragment>
);

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect (mapStateToProps) (PrivateRoute)