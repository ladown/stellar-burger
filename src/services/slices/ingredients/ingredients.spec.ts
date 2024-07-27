import { expect, test, describe } from '@jest/globals';

import ingredientsReducer, {
  fetchIngredientsThunk,
  ingredientSliceInitialState
} from './ingredientsSlice';

describe('Проверка редьюсера слайса ingredients', () => {
  test('Проверяет изменение состояние стора при вызове экшена с типом Pending', async () => {
    const reducer = ingredientsReducer(ingredientSliceInitialState, {
      type: fetchIngredientsThunk.pending.type
    });

    expect(reducer.isLoading).toBe(true);
  });

  test('Проверяет изменение состояние стора при вызове экшена с типом Fulfilled', async () => {
    const payload = [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0
      }
    ];
    const reducer = ingredientsReducer(ingredientSliceInitialState, {
      type: fetchIngredientsThunk.fulfilled.type,
      payload
    });

    expect(reducer.isLoading).toBe(false);
  });

  test('Проверяет изменение состояние стора при вызове экшена с типом Rejected', async () => {
    const error = new Error('Some error message');
    const reducer = ingredientsReducer(ingredientSliceInitialState, {
      type: fetchIngredientsThunk.rejected.type,
      error
    });

    expect(reducer.isLoading).toBe(false);
    expect(reducer.error).toBe(error.message);
  });
});
