import React, {Component}  from 'react';
import {Redirect} from 'react-router-dom'
import Auth from './Auth';

class Logout extends Component {

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