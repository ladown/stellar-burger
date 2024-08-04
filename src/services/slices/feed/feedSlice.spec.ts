import { expect, test, describe } from '@jest/globals';

import feedReducer, { getFeedsThunk, feedSliceInitialState } from './feedSlice';

describe('Проверка редьюсера слайса feed', () => {
  test('Проверяет изменение состояние стора при вызове экшена с типом Pending', async () => {
    const reducer = feedReducer(feedSliceInitialState, {
      type: getFeedsThunk.pending.type
    });

    expect(reducer.isLoading).toBe(true);
  });

  test('Проверяет изменение состояние стора при вызове экшена с типом Fulfilled', async () => {
    const payload = {
      orders: [
        {
          _id: '66a4afa2119d45001b4fbeb1',
          ingredients: ['643d69a5c3f7b9001cfa0947', '643d69a5c3f7b9001cfa093c'],
          status: 'done',
          name: 'Краторный фалленианский бургер',
          createdAt: '2024-07-27T08:28:18.306Z',
          updatedAt: '2024-07-27T08:28:18.821Z',
          number: 47565
        },
        {
          _id: '66a4abcc119d45001b4fbea3',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa093f',
            '643d69a5c3f7b9001cfa0946',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный минеральный био-марсианский бессмертный бургер',
          createdAt: '2024-07-27T08:11:56.703Z',
          updatedAt: '2024-07-27T08:11:57.314Z',
          number: 47564
        }
      ],
      total: 2,
      totalToday: 10
    };
    const reducer = feedReducer(feedSliceInitialState, {
      type: getFeedsThunk.fulfilled.type,
      payload
    });

    expect(reducer.isLoading).toBe(false);
    expect(reducer.isInit).toBe(true);
    expect(reducer.orders).toEqual(payload.orders);
    expect(reducer.total).toBe(payload.total);
    expect(reducer.totalToday).toBe(payload.totalToday);
  });

  test('Проверяет изменение состояние стора при вызове экшена с типом Rejected', async () => {
    const error = new Error('Some error message');
    const reducer = feedReducer(feedSliceInitialState, {
      type: getFeedsThunk.rejected.type,
      error
    });

    expect(reducer.isLoading).toBe(false);
    expect(reducer.isInit).toBe(true);
    expect(reducer.error).toBe(error.message);
  });
});
