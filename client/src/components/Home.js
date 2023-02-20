import React from 'react';
import { useSelector } from 'react-redux';
import SingleProduct from './SingleProduct';

function Home() {
    const items = useSelector(state => state.products.items);

    return (
        <div className="product-list">
            {items.map(item => <SingleProduct key={item.id} item={item} />)}
        </div>
    )
}

export default Home