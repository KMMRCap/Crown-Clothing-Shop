import React from 'react';
import './collections-overview.styles.scss'
import { useSelector } from 'react-redux';
import PreviewCollections from '../PreviewCollections';
import Spinner from '../../../common/Spinner';

const CollectionsOverview = () => {

    const shop = useSelector(state => state.shop);

    return (
        <div className='collections-overview'>
            {shop.fetching ?
                <Spinner />
                :
                shop.collections && shop.collections.mens ?
                    Object.values(shop.collections).map(item => (
                        <PreviewCollections
                            key={item.id}
                            title={item.title}
                            items={item.items}
                        />
                    ))
                    :
                    <div className='spinner-overlay'>
                        <h2>Sorry, No Results</h2>
                    </div>
            }
        </div>
    );
}

export default CollectionsOverview;