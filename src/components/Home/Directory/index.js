import React from 'react';
import './directory.styles.scss'
import MenuItems from '../MenuItems';
import { useSelector } from 'react-redux';

const Directory = () => {

    const directory = useSelector(state => state.directory);

    return (
        <div className='directory-menu'>
            {directory.map(item => (
                <MenuItems key={item.id} {...item} />
            ))}
        </div>
    );
}

export default Directory;