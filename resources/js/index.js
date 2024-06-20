import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import FreeQr from './components/FreeQr';
import QrIndex from './components/qr-code/QrIndex'
import FeedbackFormComponent from './components/feedback-form/FeedBackFormComponent'
import PackageIndex from './components/packages/PackageIndex'
import RegistrationIndex from './components/registration/RegistrationIndex'
import DashboardLayout from './components/user-dashboard/DashboardLayout'

if (document.getElementById('free-qr-form')) {
    ReactDOM.render(<QrIndex />, document.getElementById('free-qr-form'));
}

if (document.getElementById('feedback-form')) {
    ReactDOM.render(<FeedbackFormComponent />, document.getElementById('feedback-form'));
}

if (document.getElementById('packages')) {
    ReactDOM.render(<PackageIndex />, document.getElementById('packages'));
}

if (document.getElementById('registration-form')) {
    ReactDOM.render(<RegistrationIndex />, document.getElementById('registration-form'));
}

if (document.getElementById('dashboard-app')) {
    ReactDOM.render(<DashboardLayout />, document.getElementById('dashboard-app'));
}
