import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/app';
import Store from './components/storePage';
import Buy from './components/buyPage';
import Success from './components/successPage';

module.exports = (
    <Route path="/" component={App}>
        <IndexRoute component={Store} />
        <Route path="buy" component={Buy} />
            <Route path="buy/:price" component={Buy} />
        <Route path="success" component={Success} />
    </Route>
);
