import React from 'react';
import {Router, Link} from 'react-router';
import 'whatwg-fetch';

class BuyPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            originalPrice: this.props.params.price,
            price: this.props.params.price,
            couponInput: null,
            coupon: null,
            errorMessage: null,
            successMessage: null
        };
    }

    handleInputChange(event) {
        this.setState({
            couponInput: event.target.value
        });
    }

    submitForm(event) {
        event.preventDefault();

        this.setState({
            price: this.state.price -= 10
        });

        var accessToken =
                'eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp' +
                'XVCJ9.eyJpZCI6MSwiY29tcGFueSI6I' +
                'lRlc3QgQ29tcGFueSIsImlhdCI6MTQ2' +
                'NDI2MjYxNn0.yJE1SR-SxEe9U97PvtT' +
                '1WgcAxcTqKk_jtL7-WHhTLzI';

        //token: TEST_IOCuCXL
        fetch('/api/coupon/' + this.state.couponInput, {
            method: 'GET',
            headers: {
                'Authorization': accessToken
            }
        }).then(function(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.text();
        }).then(function(responseText) {
            var respArray = JSON.parse(responseText);
            this.setState({
                price: respArray.coupon.discount.value,
                errorMessage: null,
                successMessage: 'Valid coupon'
            });
        }.bind(this)).catch(function(err) {
            this.setState({
                errorMessage: 'Invalid coupon ID',
                successMessage: null
            });
        }.bind(this));
    }

    render() {
        return (
            <div>
                <Link to="/">Store Page</Link>
                <h3>Buy Page</h3>
                <h2>Original price: {this.state.originalPrice}</h2>
                <h1>Total: {this.state.price}</h1>
                <form>
                    Enter coupon code:
                    <input type="text" id="couponCode" onChange={this.handleInputChange.bind(this)} />
                    <button onClick={this.submitForm.bind(this)} type="submit">Calculate coupon</button>
                </form>
                <h3 style={{color: 'red'}}>{this.state.errorMessage}</h3>
                <h3 style={{color: 'green'}}>{this.state.successMessage}</h3>
            </div>
        );
    }
}

module.exports = BuyPage;
