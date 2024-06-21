import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getOrdersApi, getOrderByNumberApi } from '@api';

import type { TFeedsResponse } from '@api';
import type { TOrder } from '@utils/types.js';

export type TOrdersSliceInitialState = Pick<TFeedsResponse, 'orders'> & {
  isLoading: boolean;
  orderByNumber: TOrder | null;
  isInit: boolean;
};

const ordersSliceInitialState: TOrdersSliceInitialState = {
  orders: [],
  orderByNumber: null,
  isLoading: false,
  isInit: false
};

export const getOrdersThunk = createAsyncThunk(
  'orders/getOrders',
  getOrdersApi
);

export const getOrderByNumberThunk = createAsyncThunk(
  'orders/getOrderByNumber',
  getOrderByNumberApi
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: ordersSliceInitialState,
  reducers: {},
  selectors: {
    getOrdersLoading(state) {
      return state.isLoading;
    },

    getOrders(state) {
      return state.orders;
    },

    getOrderByNumber(state) {
      return state.orderByNumber;
    },

    getOrdersState(state) {
      return state;
    }
  },
  extraReducers(builder) {
    builder.addCase(getOrdersThunk.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getOrdersThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isInit = true;
      state.orders = action.payload;
    });

    builder.addCase(getOrdersThunk.rejected, (state) => {
      state.isLoading = false;
      state.isInit = true;
    });

    builder.addCase(getOrderByNumberThunk.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isInit = true;
      state.orderByNumber = action.payload.orders[0];
    });

    builder.addCase(getOrderByNumberThunk.rejected, (state) => {
      state.isLoading = false;
      state.isInit = true;
    });
  }
});
export const { getOrderByNumber, getOrdersLoading, getOrdersState, getOrders } =
  ordersSlice.selectors;

export default ordersSlice.reducer;
