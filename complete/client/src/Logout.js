import React, {Component}  from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom'
import Auth from './security/auth';

class Logout extends Component {

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    componentDidMount() {
        console.log('Logging Out ...');
        Auth.logOut();
    }

    render = () => {
        console.log(Auth.loggedIn());
        if (Auth.loggedIn()) {
            return (
                <Redirect to="/"/>
            );
        }

        return (<p>Logging out...</p>);
    }
}

export default Logout;