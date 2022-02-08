import React from 'react';
import { useSelector } from 'react-redux';
import { totalPriceHandler } from '../../redux-toolkit/cart/utils';
import './checkout.styles.scss'
import CheckoutItem from './CheckoutItem';
import StripeButton from './StripeButton'

const Checkout = () => {

    const cart = useSelector(state => state.cart);
    const user = useSelector(state => state.user);

    return (
        <div className='checkout-page'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {!cart.cartItems.length ?
                <span className='empty-cart'>Your Cart is Empty</span>
                :
                cart.cartItems.map(item => (
                    <CheckoutItem key={item.id} {...item} item={item} />
                ))
            }
            {cart.cartItems.length ?
                <div className='total'>
                    <span>Total : ${totalPriceHandler(cart.cartItems)}</span>
                </div>
                :
                null
            }
            {!cart.cartItems.length ?
                null
                :
                user.currentUser?.id ?
                    <StripeButton price={totalPriceHandler(cart.cartItems)} />
                    :
                    <span>You need to Sign in first</span>
            }
        </div >
    );
}

export default Checkout;