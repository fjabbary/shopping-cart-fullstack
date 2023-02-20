import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';

const initialState = {
    items: []
}

export const fetchAllProducts = createAsyncThunk('products/fetchAllProducts', async () => {
    const response = await Axios.get('http://localhost:5000/products')
    return response.data;
})

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAllProducts.fulfilled]: (state, action) => {
            state.items = action.payload
        }
    }
})

// export const {action} = productSlice.actions;
export default productSlice.reducer;