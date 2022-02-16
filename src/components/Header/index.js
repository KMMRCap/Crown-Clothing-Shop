import React from 'react';
import { Link } from 'react-router-dom';
import './header.styles.scss'
import { ReactComponent as Logo } from '../../assets/crown.svg'
import { useDispatch, useSelector } from 'react-redux'
import CartIcon from './CartIcon'
import CartDropdown from './CartDropdown';
import { signOut } from '../../redux-toolkit/user/userSlice'
import { toast, ToastContainer } from 'react-toastify';

const Header = () => {

    const user = useSelector(state => state.user);
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const handleSignOut = () => {
        dispatch(signOut()).then(res => {
            if (res.payload === 'success') {
                toast.success('You Successfully Signed Out', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else {
                toast.error('Sign Out Failed', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }).catch(err => console.log(err))
    }

    return (
        <div className='header'>
            <Link className='logo-container' to='/'>
                <Logo className='logo' />
            </Link>
            <div className='options'>
                <Link className='option' to='/shop'>SHOP</Link>
                {user.currentUser?.id ?
                    <div className='option' onClick={handleSignOut}>SIGN OUT</div>
                    :
                    <Link className='option' to='/auth'>SIGN IN</Link>
                }
                <CartIcon />
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
            {cart.hidden ?
                null
                :
                <CartDropdown />
            }
        </div>
    );
}

export default Header;