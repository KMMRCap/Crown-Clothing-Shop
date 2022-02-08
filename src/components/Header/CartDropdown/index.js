import React from 'react';
import CustomButton from '../../../common/CustomButton'
import './cart-dropdown.styles.scss'
import { useDispatch, useSelector } from 'react-redux'
import CartItem from '../CartItem'
import { Link } from 'react-router-dom';
import { hidden } from '../../../redux-toolkit/cart/cartSlice';

const CartDropdown = () => {

    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    return (
        <div className='cart-dropdown'>
            <div className='cart-items'>
                {cart.cartItems.length ?
                    cart.cartItems.map(item => (
                        <CartItem key={item.id} {...item} />
                    ))
                    :
                    <span className='empty-message'>Your Cart is Empty</span>
                }
            </div>
            <Link to='/checkout' onClick={() => dispatch(hidden())}>
                <CustomButton>Go to Checkout</CustomButton>
            </Link>
        </div>
    );
}

export default CartDropdown;