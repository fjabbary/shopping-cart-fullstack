import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

const initialState = {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) ? JSON.parse(localStorage.getItem('cartItems')) : []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const foundIndex = state.cartItems.findIndex(c => c.id === action.payload.id);

            if (foundIndex >= 0) {
                const targetedItem = state.cartItems[foundIndex];
                const targetedItemName = state.cartItems[foundIndex].name

                targetedItem.cartQty += 1;
                const targetedItemQty = state.cartItems[foundIndex].cartQty

                toast.info(`${targetedItemName} quantity increased to ${targetedItemQty}`, {
                    position: 'bottom-left'
                })

            } else {
                state.cartItems.push({ ...action.payload, cartQty: 1 })
                toast.success(`${action.payload.name} added to the cart`, {
                    position: 'bottom-left'
                })
            }

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        clearCart: (state, action) => {
            state.cartItems = []
            localStorage.removeItem('cartItems')
            // window.location.reload()
            toast.error(`Cart was cleared!`, {
                position: 'bottom-left'
            })
        },
        decreaseCart: (state, action) => {
            const newCartItems = state.cartItems.map(item => {
                if (action.payload === item.id && item.cartQty > 1) {
                    const newCartQty = item.cartQty - 1;
                    return { ...item, cartQty: newCartQty }
                }
                return item;
            })
            state.cartItems = newCartItems;
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        increaseCart: (state, action) => {
            const newCartItems = state.cartItems.map(item => {
                if (action.payload === item.id) {
                    const newCartQty = item.cartQty + 1;
                    return { ...item, cartQty: newCartQty }
                }
                return item;
            })
            state.cartItems = newCartItems;
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        removeCartItem: (state, action) => {
            const filteredCartItems = state.cartItems.filter(item => item.id !== action.payload)
            const foundItems = state.cartItems.find(item => item.id === action.payload)
            state.cartItems = filteredCartItems;
            toast.error(`${foundItems.name} remove from the cart`, { position: 'bottom-left' })
            localStorage.setItem('cartItems', JSON.stringify(filteredCartItems))
        }
    }
})

export const { addToCart, clearCart, decreaseCart, increaseCart, removeCartItem } = cartSlice.actions;

export default cartSlice.reducer;