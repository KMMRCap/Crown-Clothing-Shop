import React from 'react';
import './custom-button.styles.scss'

const CustomButton = (props) => {
    return (
        <button
            className={`custom-button ${props.googleSignIn ? 'google-sign-in' : ''} ${props.inverted ? 'inverted' : ''} `}
            type={props.type}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
}

export default CustomButton;