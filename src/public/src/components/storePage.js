import React from 'react';
import StoreItem from './storeItem';

class StorePage extends React.Component {
    render() {
        return (
            <div>
                <StoreItem name="Windows" price="2000" />
                <StoreItem name="Linux" price="2000" />
                <StoreItem name="MacOS" price="2000" />
            </div>
        );
    }
}

module.exports = StorePage;
