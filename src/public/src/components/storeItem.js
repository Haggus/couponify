import React from 'react';
import {Router, Link} from 'react-router';

class StoreItem extends React.Component {
    render() {
        var buyLink = 'buy/' + this.props.price;

        return (
            <div>
                <h1>
                    {this.props.name} - {this.props.price} - <Link to={buyLink}>Buy</Link>
                </h1>
            </div>
        );
    }
}

module.exports = StoreItem;
