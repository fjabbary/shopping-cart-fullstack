import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/productSlice'
import { Provider } from 'react-redux';
import { fetchAllProducts } from './features/productSlice';
import cartReducer from './features/cartSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));

store.dispatch(fetchAllProducts())

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

