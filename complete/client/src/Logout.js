import React, {Component}  from 'react';
import {Redirect} from 'react-router-dom'
import Auth from './security/auth';

class Logout extends Component {

    componentDidMount() {
        console.log('Logging Out ...');
        Auth.logOut(); //<1>
    }

    render = () => {
        console.log(Auth.loggedIn());
        if (Auth.loggedIn()) { //<2>
            return (
                <Redirect to="/"/>
            );
        }

        return (<p>Logging out...</p>);
    }
}

export default Logout;