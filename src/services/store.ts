import { configureStore } from '@reduxjs/toolkit';

import {
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import ingredientReducer from '@slices/ingredientsSlice';
import userReducer from '@slices/userSlice';
import feedReducer from '@slices/feedSlice';
import orderReduce from '@slices/orderSlice';
import ordersReduce from '@slices/ordersSlice';

import type { TypedUseSelectorHook } from 'react-redux';

const rootReducer = () => ({
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
