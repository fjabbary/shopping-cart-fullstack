import React from 'react'
import { addToCart } from '../features/cartSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function SingleProduct(props) {
    const { description, image, name, price } = props.item;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddToCart = (item) => {
        dispatch(addToCart(item))
        navigate("/cart")
    }

    return (
        <div className="single-product">
            <div className="single-product-img">
                <img src={image} alt={name} />
            </div>
            <div className="single-product-details">
                <p>{name}</p>
                <div className="details-container">
                    <div>{description}</div>
                    <div><strong>Price:</strong> ${price}</div>
                </div>
                <button className="btn btn-primary" onClick={() => handleAddToCart(props.item)}>Add to cart</button>
            </div>
        </div>
    )
}

export default SingleProduct