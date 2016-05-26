import React from 'react';

class StoreItem extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.name}</h1>
                <h3>{this.props.price}</h3>
            </div>
        );
    }
}

module.exports = StoreItem;
