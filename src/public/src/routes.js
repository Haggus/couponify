import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/app';
import Store from './components/storePage';

module.exports = (
    <Route path="/" component={App}>
        <IndexRoute component={Store} />
    </Route>
);
