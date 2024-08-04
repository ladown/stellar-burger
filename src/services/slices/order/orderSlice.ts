import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { orderBurgerApi } from '@api';

import type { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import type { PayloadAction } from '@reduxjs/toolkit';

export type TOrderSliceInitialState = {
  burgerConstructor: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

export const orderSliceInitialState: TOrderSliceInitialState = {
  burgerConstructor: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

export const orderBurgerThunk = createAsyncThunk(
  'order/orderBurger',
  orderBurgerApi
);

const orderSlice = createSlice({
  name: 'order',
  initialState: orderSliceInitialState,
  reducers: {
    addIngredientToBurgerConstructor: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.burgerConstructor.bun = action.payload;
        } else {
          state.burgerConstructor.ingredients.push(action.payload);
        }
      },

      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      })
    },

    removeIngredientFromBurgerConstructor(
      state,
      action: PayloadAction<TConstructorIngredient>
    ) {
      if (action.payload.type === 'bun') {
        state.burgerConstructor.bun = null;
      } else {
        state.burgerConstructor.ingredients =
          state.burgerConstructor.ingredients.filter(
            (ingredient) => ingredient.id !== action.payload.id
          );
      }
    },

    changeIngredientsBurgerConstructorOrder(
      state,
      action: PayloadAction<{
        ingredient: TConstructorIngredient;
        index: number;
        direction: 'down' | 'up';
      }>
    ) {
      const { index, direction, ingredient } = action.payload;
      const indexToReplace = direction === 'down' ? index + 1 : index - 1;
      const ingredientToReplace =
        state.burgerConstructor.ingredients[indexToReplace];
      state.burgerConstructor.ingredients[index] = ingredientToReplace;
      state.burgerConstructor.ingredients[indexToReplace] = ingredient;
    },

    removeOrderModalData(state) {
      state.orderModalData = null;
    }
  },
  selectors: {
    getOrderBurgerConstructor(state) {
      return state.burgerConstructor;
    },

    getOrderRequest(state) {
      return state.orderRequest;
    },

    getOrderModalData(state) {
      return state.orderModalData;
    },

    getOrderState(state) {
      return state;
    }
  },
  extraReducers(builder) {
    builder.addCase(orderBurgerThunk.pending, (state) => {
      state.orderRequest = true;
    });

    builder.addCase(orderBurgerThunk.fulfilled, (state, action) => {
      state.orderRequest = false;
      state.orderModalData = action.payload.order;
      state.burgerConstructor = {
        bun: null,
        ingredients: []
      };
    });

    builder.addCase(orderBurgerThunk.rejected, (state) => {
      state.orderRequest = false;
    });
  }
});
export const {
  getOrderBurgerConstructor,
  getOrderModalData,
  getOrderRequest,
  getOrderState
} = orderSlice.selectors;

export const {
  addIngredientToBurgerConstructor,
  removeIngredientFromBurgerConstructor,
  changeIngredientsBurgerConstructorOrder,
  removeOrderModalData
} = orderSlice.actions;

export default orderSlice.reducer;
