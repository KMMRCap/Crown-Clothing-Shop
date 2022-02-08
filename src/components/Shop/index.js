import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { getShopCollections } from '../../redux-toolkit/shop/shopSlice';

const Shop = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getShopCollections())
    }, [dispatch]);

    return (
        <div className='shop-page'>
            <Outlet />
        </div>
    );
}

export default Shop;