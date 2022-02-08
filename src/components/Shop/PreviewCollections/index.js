import React from 'react';
import './collection-preview.styles.scss'
import ItemCollections from '../ItemCollections'

const PreviewCollections = (props) => {
    return (
        <div className='collection-preview'>
            <h1 className='title'>{props.title.toUpperCase()}</h1>
            <div className='preview'>
                {props.items.filter((_, index) => index < 4)
                    .map(item => (
                        <ItemCollections key={item.id} {...item} item={item} />
                    ))}
            </div>
        </div>
    );
}

export default PreviewCollections;