import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Garage from './Garage';
import Auth from './security/auth';
import Login from './Login';
import Logout from './Logout';
import {Grid} from 'react-bootstrap';
import {SERVER_URL} from './config';
import {defaultErrorHandler} from './handlers/errorHandlers';
import {checkResponseStatus, loginResponseHandler} from './handlers/responseHandlers';

class App extends Component {

    constructor() {
        super();

        this.state = {
            userDetails: {
                username: '',
                password: ''
            },
            error: null
        }
    }

    /** LifeCycle methods ------------------------------------------------------------------------------------------- */
    componentWillMount() {
        Auth.sub(this);
    }

    componentWillUnmount() {
        Auth.unsub(this);
    }

    /** ------------------------------------------------------------------------------------------------------------- */

    reset = () => {
        this.setState({
            userDetails: {
                username: '',
                password: ''
            },
            error: null
        });
    };

    onAuth = (loggedIn) => {
        this.setState({
            loggedIn: loggedIn
        });
    };

    login = (e) => {
        console.log('login');
        e.preventDefault();

        fetch(`${SERVER_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.userDetails)
        }).then(checkResponseStatus)
            .then(loginResponseHandler) //<1>
            .catch(error => defaultErrorHandler(error, this.customErrorHandler));
    };

    inputChangeHandler = (event) => {
        let {userDetails} = this.state;
        const target = event.target;

        userDetails[target.name] = target.value;

        this.setState({userDetails});
    };

    customErrorHandler = (error) => { //<2>
        this.reset();
        this.setState({error: error.message});
    };

    logoutHandler = () => {
        this.reset();
    };

    render() {
        const {error, userDetails} = this.state;

        return (
            <Grid>
                <Switch>
                    <Route path="/login" render={() => <Login error={error} //<2>
                                                              userDetails={userDetails}
                                                              inputChangeHandler={this.inputChangeHandler}
                                                              onSubmit={this.login}/>}/>
                    <Route path="/logout" component={Logout} //<1>
                    />
                    <Route exact path="/"
                           render={() => Auth.loggedIn() ? <Redirect to="/garage"/> : <Login error={error} //<3>
                                                                                             userDetails={userDetails}
                                                                                             inputChangeHandler={this.inputChangeHandler}
                                                                                             onSubmit={this.login}/>}/>
                    <Route path="/garage" component={() => <Garage logoutHandler={this.logoutHandler}/>} //<4>
                    />
                </Switch>
            </Grid>
        );
    }
}

export default App;