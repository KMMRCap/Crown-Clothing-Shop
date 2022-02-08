import React from 'react';
import './spiner.scss'

const Spinner = () => {
    return (
        <div className='spinner-overlay'>
            <div className='spinner-container'></div>
        </div>
    );
}

export default Spinner;