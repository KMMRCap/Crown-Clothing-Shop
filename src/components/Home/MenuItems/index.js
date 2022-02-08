import React from 'react';
import './menu-item.styles.scss'
import { Link } from 'react-router-dom'

const MenuItems = (props) => {

    return (
        <Link to={props.linkUrl} className={`menu-item ${props.size ? props.size : ''}`}>
            <div
                className='background-image'
                style={{ backgroundImage: `url(${props.imageUrl})` }}
            />
            <div className='content'>
                <h1 className='title'>{props.title.toUpperCase()}</h1>
                <span className='subtitle'>Shop Now</span>
            </div>
        </Link>
    );
}

export default MenuItems;