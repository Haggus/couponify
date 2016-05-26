import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';

var container = document.getElementById('app');

class App extends React.Component {
    render() {
        return <h1>Couponify</h1>;
    }
}

ReactDOM.render(<App />, container);
