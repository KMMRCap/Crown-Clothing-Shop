import React from 'react';
import './collection-item.styles.scss'
import CustomButton from '../../../common/CustomButton'
import { useDispatch } from 'react-redux'
import { addItemToCart } from '../../../redux-toolkit/cart/cartSlice'

const ItemCollections = (props) => {

    const dispatch = useDispatch();

    return (
        <div className='collection-item'>
            <div className='image' style={{ backgroundImage: `url(${props.imageUrl})` }} />
            <div className='collection-footer'>
                <span className='name'>{props.name}</span>
                <span className='price'>{props.price}</span>
            </div>
            <CustomButton inverted onClick={() => dispatch(addItemToCart(props.item))}>
                Add to Cart
            </CustomButton>
        </div>
    );
}

export default ItemCollections;