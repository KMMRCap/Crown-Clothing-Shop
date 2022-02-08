import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ItemCollections from '../ItemCollections';
import './collection.styles.scss'
import Spinner from '../../../common/Spinner'

const Collection = () => {

    const {category} = useParams()
    const shop = useSelector(state => state.shop);

    return (
        <div className='collection-page'>
            {shop.fetching ?
                <Spinner />
                :
                shop.collections && shop.collections[category] ?
                    <>
                        <h2 className='title'>{shop.collections[category].title}</h2>
                        <div className='items'>
                            {shop.collections[category].items.map(item => (
                                <ItemCollections key={item.id} {...item} item={item} />
                            ))}
                        </div>
                    </>
                    :
                    <div className='spinner-overlay'>
                        <h2>Sorry, No Results</h2>
                    </div>
            }
        </div>
    );
}

export default Collection;