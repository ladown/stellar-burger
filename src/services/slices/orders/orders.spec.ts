import { expect, test, describe } from '@jest/globals';

import ordersReducer, {
  ordersSliceInitialState,
  getOrdersThunk,
  getOrderByNumberThunk
} from './ordersSlice';

describe('Проверка редьюсера слайса orders', () => {
  describe('Проверяет getOrderThunk', () => {
    test('Проверяет изменение состояние стора при вызове экшена с типом Pending', async () => {
      const reducer = ordersReducer(ordersSliceInitialState, {
        type: getOrdersThunk.pending.type
      });

      expect(reducer.isLoading).toBe(true);
    });

    test('Проверяет изменение состояние стора при вызове экшена с типом Fulfilled', async () => {
      const payload = {
        orders: [
          {
            _id: '66a2b38f119d45001b4fb9d4',
            ingredients: [
              '643d69a5c3f7b9001cfa093c',
              '643d69a5c3f7b9001cfa093c',
              '643d69a5c3f7b9001cfa0941'
            ],
            owner: '6667535d97ede0001d06fd7e',
            status: 'done',
            name: 'Краторный био-марсианский бургер',
            createdAt: '2024-07-25T20:20:31.764Z',
            updatedAt: '2024-07-25T20:20:32.268Z',
            number: 47372,
            __v: 0
          }
        ]
      };
      const reducer = ordersReducer(ordersSliceInitialState, {
        type: getOrdersThunk.fulfilled.type,
        payload
      });

      expect(reducer.isLoading).toBe(false);
    });

    test('Проверяет изменение состояние стора при вызове экшена с типом Rejected', async () => {
      const error = new Error('Some error message');
      const reducer = ordersReducer(ordersSliceInitialState, {
        type: getOrdersThunk.rejected.type,
        error
      });

      expect(reducer.isLoading).toBe(false);
      expect(reducer.error).toBe(error.message);
    });
  });

  describe('Проверяет getOrderByNumberThunk', () => {
    test('Проверяет изменение состояние стора при вызове экшена с типом Pending', async () => {
      const reducer = ordersReducer(ordersSliceInitialState, {
        type: getOrderByNumberThunk.pending.type
      });

      expect(reducer.isLoading).toBe(true);
    });

    test('Проверяет изменение состояние стора при вызове экшена с типом Fulfilled', async () => {
      const payload = {
        orders: [
          {
            _id: '666b418297ede0001d070740',
            ingredients: [
              '643d69a5c3f7b9001cfa093c',
              '643d69a5c3f7b9001cfa0941'
            ],
            status: 'done',
            name: 'Краторный био-марсианский бургер',
            createdAt: '2024-06-13T18:59:14.279Z',
            updatedAt: '2024-06-13T18:59:14.740Z',
            number: 42308
          },
          {
            _id: '666b42e897ede0001d070742',
            ingredients: [
              '643d69a5c3f7b9001cfa093c',
              '643d69a5c3f7b9001cfa0941',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093f',
              '643d69a5c3f7b9001cfa093c'
            ],
            status: 'done',
            name: 'Краторный бессмертный люминесцентный био-марсианский бургер',
            createdAt: '2024-06-13T19:05:12.821Z',
            updatedAt: '2024-06-13T19:05:13.224Z',
            number: 42309
          }
        ]
      };
      const reducer = ordersReducer(ordersSliceInitialState, {
        type: getOrderByNumberThunk.fulfilled.type,
        payload
      });

      expect(reducer.isLoading).toBe(false);
    });

    test('Проверяет изменение состояние стора при вызове экшена с типом Rejected', async () => {
      const error = new Error('Some error message');
      const reducer = ordersReducer(ordersSliceInitialState, {
        type: getOrderByNumberThunk.rejected.type,
        error
      });

      expect(reducer.isLoading).toBe(false);
      expect(reducer.error).toBe(error.message);
    });
  });
});
