import React from 'react';
import ReactDOM from 'react-dom';
import {Router, hashHistory} from 'react-router';

import routes from './routes';

var container = document.getElementById('app');

ReactDOM.render(
        <Router history={hashHistory} routes={routes}/>,
        container
);
