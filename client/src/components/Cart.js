import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCart, decreaseCart, increaseCart, removeCartItem } from '../features/cartSlice';

function Cart() {
    const cartItems = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();
    const [subtotal, setTotal] = useState(0)

    useEffect(() => {
        let subtotalAmount = 0
        cartItems.forEach(item => subtotalAmount += item.price * item.cartQty)
        setTotal(subtotalAmount)
    }, [cartItems])

    if (cartItems.length !== 0) {
        return (
            <div className="cart">
                <h2>Shopping Cart</h2>
                <div className="custom-table">
                    <div className="table-header">
                        <div>PRODDUCT</div>
                        <div>PRICE</div>
                        <div>QUANTITY</div>
                        <div>TOTAL</div>
                    </div>
                    <div className="table-body">
                        {cartItems.map(cartItem => {
                            const { id, name, description, price, image, cartQty } = cartItem
                            return (
                                <div className="table-row" key={cartItem.id}>
                                    <div className="cart-product-details">
                                        <div className='cart-product-img'>
                                            <img src={image} alt={name} />
                                        </div>
                                        <div className="cart-product-description">
                                            <h4>{name}</h4>
                                            <p>{description}</p>
                                            <button className='remove-btn' onClick={() => dispatch(removeCartItem(id))}>Remove</button>
                                        </div>
                                    </div>
                                    <div>${price}</div>
                                    <div className='cart-qty'>
                                        <div><button className='minus' onClick={() => dispatch(decreaseCart(id))}> - </button></div>
                                        <div><span>{cartQty}</span></div>
                                        <div><button className='plus' onClick={() => dispatch(increaseCart(id))}> + </button></div>
                                    </div>
                                    <div>
                                        <span>${price * cartQty}</span>
                                    </div>
                                </div>
                            )
                        })}

                        <div className="cart-cta">
                            <div>
                                <button className="btn btn-clear" onClick={() => dispatch(clearCart())}>Clear Cart</button>
                            </div>
                            <div className="cart-subtotal">
                                <div className="d-flex">
                                    <div>Subtotal</div>
                                    <div>${subtotal}</div>
                                </div>
                                <p className="cart-text">Taxes and shipping calculated at checkout</p>
                                <button className="btn btn-primary">Check out</button>

                                <div className="continue-shopping"><Link to="/">&larr; Continue Shopping</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        // When Shopping cart is empty
        return (
            <div className='empty-cart'><h2>No Items in the shopping cart</h2><Link to="/"><h5>Return to Home page</h5></Link></div>
        )
    }

}

export default Cart;