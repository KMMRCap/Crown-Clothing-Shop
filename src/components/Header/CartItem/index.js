import React from 'react';
import './cart-item.styles.scss'

const CartItem = (props) => {
    return (
        <div className='cart-item'>
            <img src={props.imageUrl} alt='item' />
            <div className='item-details'>
                <span className='name'>{props.name}</span>
                <span className='price'>{props.quantity} × ${props.price}</span>
            </div>
        </div>
    );
}

export default CartItem;