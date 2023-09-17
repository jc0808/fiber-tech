import { configureStore } from '@reduxjs/toolkit';

import productsSlice from '../features/productsSlice';
import userSlice from '../features/userSlice';
import cartSlice from '../features/cartSlice';
import ordersSlice from '../features/ordersSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    products: productsSlice,
    cart: cartSlice,
    orders: ordersSlice,
  },
});
