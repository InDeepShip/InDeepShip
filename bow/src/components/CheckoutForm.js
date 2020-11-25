import React, { Component } from 'react';
import { CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import axios from 'axios';
import '../styles/StripeForm.scss';

class CheckoutForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };

    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const { stripe, elements } = this.props;

        if (!stripe || !elements) {
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }

        const response = await axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/api/payments/create-checkout-session/`)

        const session = await response.data;

        const result = await stripe.redirectToCheckout({ sessionId: session.id });

    };

    render() {
        const { stripe } = this.props;

        return (
            <form className="form stripe-form" onSubmit={this.handleSubmit}>
                <CardElement
                options={{
                    style: {
                    base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                        color: '#aab7c4',
                        },
                    },
                    invalid: {
                        color: '#9e2146',
                    },
                    },
                }}
                />
                <button className="button is-primary" type="submit" disabled={!stripe}>
                    Pay
                </button>
            </form>
        );
    }
}

const InjectedCheckoutForm = () => {
    return (
        <ElementsConsumer>
            {({ elements, stripe }) => (
                <CheckoutForm elements={ elements } stripe={ stripe } />
            )}
        </ElementsConsumer>
    );
}

export default InjectedCheckoutForm;