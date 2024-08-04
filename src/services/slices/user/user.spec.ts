import { expect, test, describe } from '@jest/globals';

import userReducer, {
  userSliceInitialState,
  getUserThunk,
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
  updateUserDataThunk,
  resetPasswordUserThunk,
  forgotPasswordUserThunk
} from './userSlice';

describe('Проверка редьюсера слайса orders', () => {
  const userMockData = {
    email: 'test@yandex.ru',
    name: 'test'
  };

  describe('Проверяет registerUserThunk', () => {
    test('Проверяет изменение состояние стора при вызове экшена с типом Pending', async () => {
      const reducer = userReducer(userSliceInitialState, {
        type: registerUserThunk.pending.type
      });

      expect(reducer.error).toBe('');
      expect(reducer.isLoading).toBe(true);
    });

    test('Проверяет изменение состояние стора при вызове экшена с типом Fulfilled', async () => {
      const payload = {
        ...userMockData
      };
      const reducer = userReducer(userSliceInitialState, {
        type: registerUserThunk.fulfilled.type,
        payload
      });

      expect(reducer.isInit).toBe(true);
      expect(reducer.isLoading).toBe(false);
      expect(reducer.user).toEqual(payload);
    });

    test('Проверяет изменение состояние стора при вызове экшена с типом Rejected', async () => {
      const error = new Error('Some error message');
      const reducer = userReducer(userSliceInitialState, {
        type: registerUserThunk.rejected.type,
        error
      });

      expect(reducer.isInit).toBe(true);
      expect(reducer.isLoading).toBe(false);
      expect(reducer.error).toBe(error.message);
    });
  });

  describe('Проверяет loginUserThunk', () => {
    test('Проверяет изменение состояние стора при вызове экшена с типом Pending', async () => {
      const reducer = userReducer(userSliceInitialState, {
        type: loginUserThunk.pending.type
      });

      expect(reducer.error).toBe('');
      expect(reducer.isLoading).toBe(true);
    });

    test('Проверяет изменение состояние стора при вызове экшена с типом Fulfilled', async () => {
      const payload = {
        ...userMockData
      };
      const reducer = userReducer(userSliceInitialState, {
        type: loginUserThunk.fulfilled.type,
        payload
      });

      expect(reducer.isInit).toBe(true);
      expect(reducer.isLoading).toBe(false);
      expect(reducer.user).toEqual(payload);
    });

    test('Проверяет изменение состояние стора при вызове экшена с типом Rejected', async () => {
      const error = new Error('Some error message');
      const reducer = userReducer(userSliceInitialState, {
        type: loginUserThunk.rejected.type,
        error
      });

      expect(reducer.isInit).toBe(true);
      expect(reducer.isLoading).toBe(false);
      expect(reducer.error).toBe(error.message);
    });
  });

  describe('Проверяет getUserThunk', () => {
    test('Проверяет изменение состояние стора при вызове экшена с типом Pending', async () => {
      const reducer = userReducer(userSliceInitialState, {
        type: getUserThunk.pending.type
      });

      expect(reducer.error).toBe('');
      expect(reducer.isLoading).toBe(true);
    });

    test('Проверяет изменение состояние стора при вызове экшена с типом Fulfilled', async () => {
      const payload = {
        user: userMockData
      };
      const reducer = userReducer(userSliceInitialState, {
        type: getUserThunk.fulfilled.type,
        payload
      });

      expect(reducer.isInit).toBe(true);
      expect(reducer.isLoading).toBe(false);
      expect(reducer.user).toEqual(payload.user);
    });

    test('Проверяет изменение состояние стора при вызове экшена с типом Rejected', async () => {
      const error = new Error('Some error message');
      const reducer = userReducer(userSliceInitialState, {
        type: getUserThunk.rejected.type,
        error
      });

      expect(reducer.isInit).toBe(true);
      expect(reducer.isLoading).toBe(false);
      expect(reducer.error).toBe(error.message);
    });
  });

  describe('Проверяет updateUserDataThunk', () => {
    test('Проверяет изменение состояние стора при вызове экшена с типом Pending', async () => {
      const reducer = userReducer(userSliceInitialState, {
        type: updateUserDataThunk.pending.type
      });

      expect(reducer.error).toBe('');
      expect(reducer.isLoading).toBe(true);
    });

    test('Проверяет изменение состояние стора при вызове экшена с типом Fulfilled', async () => {
      const payload = {
        user: userMockData
      };
      const reducer = userReducer(userSliceInitialState, {
        type: updateUserDataThunk.fulfilled.type,
        payload
      });

      expect(reducer.isLoading).toBe(false);
      expect(reducer.user).toEqual(payload.user);
    });

    test('Проверяет изменение состояние стора при вызове экшена с типом Rejected', async () => {
      const error = new Error('Some error message');
      const reducer = userReducer(userSliceInitialState, {
        type: updateUserDataThunk.rejected.type,
        error
      });

      expect(reducer.isLoading).toBe(false);
      expect(reducer.error).toBe(error.message);
    });
  });

  describe('Проверяет logoutUserThunk', () => {
    test('Проверяет изменение состояние стора при вызове экшена с типом Pending', async () => {
      const reducer = userReducer(userSliceInitialState, {
        type: logoutUserThunk.pending.type
      });

      expect(reducer.error).toBe('');
      expect(reducer.isLoading).toBe(true);
    });

    test('Проверяет изменение состояние стора при вызове экшена с типом Fulfilled', async () => {
      const reducer = userReducer(userSliceInitialState, {
        type: logoutUserThunk.fulfilled.type
      });

      expect(reducer.isLoading).toBe(false);
      expect(reducer.user).toEqual(undefined);
    });

    test('Проверяет изменение состояние стора при вызове экшена с типом Rejected', async () => {
      const error = new Error('Some error message');
      const reducer = userReducer(userSliceInitialState, {
        type: logoutUserThunk.rejected.type,
        error
      });

      expect(reducer.isLoading).toBe(false);
      expect(reducer.error).toBe(error.message);
    });
  });

  describe('Проверяет forgotPasswordUserThunk', () => {
    test('Проверяет изменение состояние стора при вызове экшена с типом Pending', async () => {
      const reducer = userReducer(userSliceInitialState, {
        type: forgotPasswordUserThunk.pending.type
      });

      expect(reducer.error).toBe('');
      expect(reducer.isLoading).toBe(true);
    });
    test('Проверяет изменение состояние стора при вызове экшена с типом Fulfilled', async () => {
      const reducer = userReducer(userSliceInitialState, {
        type: forgotPasswordUserThunk.fulfilled.type
      });

      expect(reducer.isLoading).toBe(false);
      expect(reducer.isInit).toBe(true);
    });
    test('Проверяет изменение состояние стора при вызове экшена с типом Rejected', async () => {
      const error = new Error('Some error message');
      const reducer = userReducer(userSliceInitialState, {
        type: forgotPasswordUserThunk.rejected.type,
        error
      });

      expect(reducer.isLoading).toBe(false);
      expect(reducer.isInit).toBe(true);
      expect(reducer.error).toBe(error.message);
    });
  });

  describe('Проверяет resetPasswordUserThunk', () => {
    test('Проверяет изменение состояние стора при вызове экшена с типом Pending', async () => {
      const reducer = userReducer(userSliceInitialState, {
        type: resetPasswordUserThunk.pending.type
      });

      expect(reducer.error).toBe('');
      expect(reducer.isLoading).toBe(true);
    });

    test('Проверяет изменение состояние стора при вызове экшена с типом Fulfilled', async () => {
      const reducer = userReducer(userSliceInitialState, {
        type: resetPasswordUserThunk.fulfilled.type
      });

      expect(reducer.isLoading).toBe(false);
    });

    test('Проверяет изменение состояние стора при вызове экшена с типом Rejected', async () => {
      const error = new Error('Some error message');
      const reducer = userReducer(userSliceInitialState, {
        type: resetPasswordUserThunk.rejected.type,
        error
      });

      expect(reducer.isLoading).toBe(false);
      expect(reducer.error).toBe(error.message);
    });
  });
});
