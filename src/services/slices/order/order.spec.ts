import { expect, test, describe, jest } from '@jest/globals';

import orderReducer, {
  addIngredientToBurgerConstructor,
  removeIngredientFromBurgerConstructor,
  changeIngredientsBurgerConstructorOrder,
  orderSliceInitialState
} from './orderSlice';

jest.mock('uuid', () => ({
  v4: () => 'f1ff8f22-be93-46fd-a50b-1a6b841f2c32'
}));

describe('Проверяет работу редьюсера order', () => {
  test('Проверяет добавление ингредиента в конструктор бургера', () => {
    const ingredientToAdd = {
      _id: '643d69a5c3f7b9001cfa093c',
      id: 'f1ff8f22-be93-46fd-a50b-1a6b841f2c32',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    };

    const reducer = orderReducer(
      orderSliceInitialState,
      addIngredientToBurgerConstructor(ingredientToAdd)
    );

    expect(reducer.burgerConstructor.bun).toEqual(ingredientToAdd);
  });

  test('Проверяет удаление ингредиента из конструктора бергера', () => {
    const initialState = {
      burgerConstructor: {
        bun: {
          _id: '643d69a5c3f7b9001cfa093c',
          id: 'f1ff8f22-be93-46fd-a50b-1a6b841f2c32',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
        },
        ingredients: []
      },
      orderRequest: false,
      orderModalData: null
    };

    const reducer = orderReducer(
      initialState,
      removeIngredientFromBurgerConstructor(initialState.burgerConstructor.bun)
    );

    expect(reducer.burgerConstructor.bun).toEqual(null);
  });

  test('Проверяет изменение порядка ингредиентов в конструкторе бергера', () => {
    const initialState = {
      burgerConstructor: {
        bun: null,
        ingredients: [
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
            image_large:
              'https://code.s3.yandex.net/react/code/meat-01-large.png',
            __v: 0,
            id: 'f1ff8f22-be93-46fd-a50b-1a6b841f2c32'
          },
          {
            _id: '643d69a5c3f7b9001cfa093e',
            name: 'Филе Люминесцентного тетраодонтимформа',
            type: 'main',
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: 'https://code.s3.yandex.net/react/code/meat-03.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-03-large.png',
            __v: 0,
            id: 'f1ff8f22-be93-46fd-a50b-1a6b841f2c32'
          }
        ]
      },
      orderRequest: false,
      orderModalData: null
    };

    const reducer = orderReducer(
      initialState,
      changeIngredientsBurgerConstructorOrder({
        ingredient: initialState.burgerConstructor.ingredients[0],
        index: 0,
        direction: 'down'
      })
    );

    expect(reducer.burgerConstructor.ingredients).toEqual(
      initialState.burgerConstructor.ingredients.reverse()
    );
  });
});
