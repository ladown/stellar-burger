import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getIngredientsApi } from '@api';

import type { TIngredient } from '@utils-types';

export type TIngredientSliceInitialState = {
  isLoading: boolean;
  ingredients: TIngredient[];
  error: string | undefined;
};

export const ingredientSliceInitialState: TIngredientSliceInitialState = {
  isLoading: false,
  ingredients: [],
  error: ''
};

export const fetchIngredientsThunk = createAsyncThunk(
  'ingredient/fetchIngredients',
  getIngredientsApi
);

const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState: ingredientSliceInitialState,
  reducers: {},
  selectors: {
    getIngredientLoading(state) {
      return state.isLoading;
    },

    getIngredientError(state) {
      return state.error;
    },

    getIngredientData(state) {
      return state.ingredients;
    },

    getIngredientState(state) {
      return state;
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchIngredientsThunk.pending, (state) => {
      state.error = '';
      state.isLoading = true;
    });

    builder.addCase(fetchIngredientsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.ingredients = action.payload;
    });

    builder.addCase(fetchIngredientsThunk.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  }
});
export const {
  getIngredientState,
  getIngredientData,
  getIngredientError,
  getIngredientLoading
} = ingredientSlice.selectors;

export default ingredientSlice.reducer;
