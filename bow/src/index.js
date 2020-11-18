import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import './styles/index.scss';
import store from './store';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.withCredentials = true;

ReactDOM.render(<Root store={store} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
