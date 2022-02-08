import React from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import './auth.scss'

const Auth = () => {
    return (
        <div className='auth-container'>
            <SignIn />
            <SignUp />
        </div>
    );
}
 
export default Auth;