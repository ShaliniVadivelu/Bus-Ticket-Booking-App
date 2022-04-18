import React from 'react'
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
// alerts is a destructor here
const Alert = ({ alerts}) => 
// if the below cdn satisfied it will print corresponding alert type.here we have only one which is for pw.
    alerts !== null && 
    alerts.length > 0 &&
    alerts.map(alert => (
    <div key={alert.id} className ={`alerts alert-${alert.alertType}`}>
    {alert.msg}
    </div>
    ));

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
};

const mapStateToProps =  state => ({
    alerts: state.alert
});

export default connect(mapStateToProps) (Alert);