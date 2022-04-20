//when we loged out the account and go back to the page we can see the previous datas, but this should not happen. To avoid this we have create a private route
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// rest operator, it will take anything was passed in
const PrivateRouteO = ( { component : Component, 
    auth: { isAuthenticated, loading},
    ...rest 
}) => (
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
);

PrivateRouteO.propTypes = {
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect (mapStateToProps) (PrivateRouteO)