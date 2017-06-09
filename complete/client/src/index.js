import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import createBrowserHistory from 'history/createBrowserHistory';
import {HashRouter as Router } from 'react-router-dom';
import './css/App.css';
import './css/grails.css';
import './css/main.css';

ReactDOM.render((
    <Router history={ createBrowserHistory() }>
        <App />
    </Router>
), document.getElementById('root'));