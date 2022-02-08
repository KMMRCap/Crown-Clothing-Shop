import React from 'react';
import { ReactComponent as ShoppingIcon } from '../../../assets/shopping-bag.svg'
import './cart-icon.styles.scss'
import { useDispatch, useSelector } from 'react-redux'
import { hidden } from '../../../redux-toolkit/cart/cartSlice'
import { totalItemsHandler } from '../../../redux-toolkit/cart/utils'

const CartIcon = () => {

    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    return (
        <div className='cart-icon' onClick={() => dispatch(hidden())}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>{totalItemsHandler(cart.cartItems)}</span>
        </div>
    );
}

export default CartIcon;