import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getFeedsApi } from '@api';

import type { TFeedsResponse } from '@api';

export type TFeedSliceInitialState = Pick<
  TFeedsResponse,
  'orders' | 'totalToday' | 'total'
> & {
  isLoading: boolean;
  isInit: boolean;
};

const feedSliceInitialState: TFeedSliceInitialState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  isInit: false
};

export const getFeedsThunk = createAsyncThunk('feed/getFeeds', getFeedsApi);

const feedSlice = createSlice({
  name: 'feed',
  initialState: feedSliceInitialState,
  reducers: {},
  selectors: {
    getFeedLoading(state) {
      return state.isLoading;
    },

    getFeedOrders(state) {
      return state.orders;
    },

    getFeedTotal(state) {
      return state.total;
    },

    getFeedTotalToday(state) {
      return state.totalToday;
    },

    getFeedState(state) {
      return state;
    }
  },
  extraReducers(builder) {
    builder.addCase(getFeedsThunk.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getFeedsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isInit = true;
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });

    builder.addCase(getFeedsThunk.rejected, (state) => {
      state.isLoading = false;
      state.isInit = true;
    });
  }
});
export const {
  getFeedLoading,
  getFeedOrders,
  getFeedState,
  getFeedTotal,
  getFeedTotalToday
} = feedSlice.selectors;

export default feedSlice.reducer;
