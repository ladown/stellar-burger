import { configureStore } from '@reduxjs/toolkit';

import {
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import ingredientReducer from '@slices/ingredients/ingredientsSlice';
import userReducer from '@slices/user/userSlice';
import feedReducer from '@slices/feed/feedSlice';
import orderReduce from '@slices/order/orderSlice';
import ordersReduce from '@slices/orders/ordersSlice';

import type { TypedUseSelectorHook } from 'react-redux';

export const rootReducer = () => ({
  ingredient: ingredientReducer,
  user: userReducer,
  feed: feedReducer,
  order: orderReduce,
  orders: ordersReduce
});

const store = configureStore({
  reducer: rootReducer(),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
