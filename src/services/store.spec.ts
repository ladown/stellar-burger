import { expect, test } from '@jest/globals';

import { rootReducer } from './store';
import ingredientReducer from '@slices/ingredients/ingredientsSlice';
import userReducer from '@slices/user/userSlice';
import feedReducer from '@slices/feed/feedSlice';
import orderReduce from '@slices/order/orderSlice';
import ordersReduce from '@slices/orders/ordersSlice';

test('Проверяет правильную инициализацию rootReducer', () => {
  expect(rootReducer()).toEqual({
    ingredient: ingredientReducer,
    user: userReducer,
    feed: feedReducer,
    order: orderReduce,
    orders: ordersReduce
  });
});
