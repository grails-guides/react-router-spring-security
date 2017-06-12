import {SERVER_URL} from './../config';
import {checkResponseStatus} from './../handlers/responseHandlers';
import headers from './../security/headers';
import 'whatwg-fetch';

export default {
    subscribers: new Set(),

    logIn(auth) {
        localStorage.auth = JSON.stringify(auth);
        this.onAuth(true); //<1>
    },

    logOut() {
        delete localStorage.auth;
        this.onAuth(false); //<2>
    },

    loggedIn() {  //<3>
      return localStorage.auth && fetch(`${SERVER_URL}/api/vehicle`, {headers: headers()})
          .then(checkResponseStatus)
          .then(() => { return true })
          .catch(() => { return false });
    },

    sub(component) {
        this.subscribers.add(component);
        component.onAuth(this.loggedIn()); //<1>
    },

    unsub(component) {
        this.subscribers.delete(component);
    },

    onAuth(loggedIn) {
        this.subscribers.forEach((sub) => {
            sub.onAuth.bind(sub)(loggedIn);
        });
    },
};