import React from 'react';
import { useDispatch } from 'react-redux';
import './checkout-item.styles.scss'
import { removeItemFromCart, reduceItemQuantity, increaseItemQuantity } from '../../../redux-toolkit/cart/cartSlice'

const CheckoutItem = (props) => {

    const dispatch = useDispatch();

    return (
        <div className='checkout-item'>
            <div className='image-container'>
                <img src={props.imageUrl} alt='item' />
            </div>
            <span className='name'>{props.name}</span>
            <div className='quantity'>
                <div
                    className='arrow'
                    onClick={() => dispatch(reduceItemQuantity(props.item))}
                >
                    &#10094;
                </div>
                <span className='value'>{props.quantity}</span>
                <div
                    className='arrow'
                    onClick={() => dispatch(increaseItemQuantity(props.item))}
                >
                    &#10095;
                </div>
            </div>
            <span className='price'>{props.price}</span>
            <span
                className='remove-button'
                onClick={() => { dispatch(removeItemFromCart(props.item)) }}
            >
                &#10005;
            </span>
        </div>
    );
}

export default CheckoutItem;