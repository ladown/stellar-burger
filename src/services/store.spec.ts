import { expect, test } from '@jest/globals';

import { rootReducer } from './store';
import ingredientReducer from '@slices/ingredientsSlice';
import userReducer from '@slices/userSlice';
import feedReducer from '@slices/feedSlice';
import orderReduce from '@slices/orderSlice';
import ordersReduce from '@slices/ordersSlice';

test('Проверяет правильную инициализацию rootReducer', () => {
  expect(rootReducer()).toEqual({
    ingredient: ingredientReducer,
    user: userReducer,
    feed: feedReducer,
    order: orderReduce,
    orders: ordersReduce
  });
});
