import {SERVER_URL} from './../config';
import {checkResponseStatus} from './../handlers/responseHandlers';
import headers from './../security/headers';
import 'whatwg-fetch';

export default {
    subscribers: new Set(),

    logIn(auth) { //<1>
        localStorage.auth = JSON.stringify(auth);
        this.onAuth(true);
    },

    logOut() { //<2>
        delete localStorage.auth;
        this.onAuth(false);
    },

    // loggedIn() {  //<3>
    //     return !!localStorage.auth;
    // },

    loggedIn() {  //<3>
      return localStorage.auth && fetch(`${SERVER_URL}/api/vehicle`, {headers: headers()})
          .then(checkResponseStatus)
          .then(() => { return true })
          .catch(() => { return false });
    },
    
    sub(component) {
        this.subscribers.add(component);
        component.onAuth(this.loggedIn());
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