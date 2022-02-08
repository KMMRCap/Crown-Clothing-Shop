import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeButton = (props) => {

    const priceForStripe = props.price * 100
    const publishableKey = 'pk_test_CXkmJ4cc7Ap4BZJDGLDH8R3A00fs1ubI6N'

    const onToken = token => {
        console.log(token)
        alert('Payment Successful')
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='Clothing Store'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your Total is $${props.price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
}

export default StripeButton;