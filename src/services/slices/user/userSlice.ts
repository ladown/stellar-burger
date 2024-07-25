import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  resetPasswordApi,
  forgotPasswordApi
} from '@api';
import { setCookie, deleteCookie } from '@utils/cookie';

import type { TUser } from '@utils-types';
import type { TRegisterData, TLoginData } from '@api';

export const registerUserThunk = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);

    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);

    return response.user;
  }
);

export const loginUserThunk = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);

    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);

    return response.user;
  }
);

export const getUserThunk = createAsyncThunk('user/getUser', getUserApi);

export const updateUserDataThunk = createAsyncThunk(
  'user/updateUserData',
  updateUserApi
);

export const logoutUserThunk = createAsyncThunk('user/logoutUser', async () => {
  await logoutApi();
  deleteCookie('accessToken');
});

export const forgotPasswordUserThunk = createAsyncThunk(
  'user/forgotPasswordUser',
  forgotPasswordApi
);

export const resetPasswordUserThunk = createAsyncThunk(
  'user/resetPasswordUser',
  resetPasswordApi
);

export type TUserSliceInitialState = {
  isLoading: boolean;
  isInit: boolean;
  user: TUser | undefined;
  error: string | undefined;
};

const userSliceInitialState: TUserSliceInitialState = {
  isLoading: false,
  isInit: false,
  user: undefined,
  error: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState: userSliceInitialState,
  reducers: {},
  selectors: {
    getUserLoading(state) {
      return state.isLoading;
    },

    getUserInit(state) {
      return state.isInit;
    },

    getUserData(state) {
      return state.user;
    },

    getUserError(state) {
      return state.error;
    },

    getUserState(state) {
      return state;
    }
  },
  extraReducers(builder) {
    builder.addCase(registerUserThunk.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });

    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isInit = true;
      state.isLoading = false;
    });

    builder.addCase(registerUserThunk.rejected, (state, action) => {
      state.isInit = true;
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(loginUserThunk.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });

    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isInit = true;
      state.isLoading = false;
    });

    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.isInit = true;
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(getUserThunk.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });

    builder.addCase(getUserThunk.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isInit = true;
      state.isLoading = false;
    });

    builder.addCase(getUserThunk.rejected, (state) => {
      state.isLoading = false;
      state.isInit = true;
    });

    builder.addCase(updateUserDataThunk.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });

    builder.addCase(updateUserDataThunk.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isInit = true;
      state.isLoading = false;
    });

    builder.addCase(logoutUserThunk.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });

    builder.addCase(logoutUserThunk.fulfilled, (state) => {
      state.user = undefined;
      state.isInit = true;
      state.isLoading = false;
    });

    builder.addCase(forgotPasswordUserThunk.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });

    builder.addCase(forgotPasswordUserThunk.fulfilled, (state) => {
      state.isLoading = false;
      state.isInit = true;
    });

    builder.addCase(forgotPasswordUserThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isInit = true;
      state.error = action.error.message;
    });

    builder.addCase(resetPasswordUserThunk.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });

    builder.addCase(resetPasswordUserThunk.fulfilled, (state) => {
      state.isLoading = false;
      state.isInit = true;
    });

    builder.addCase(resetPasswordUserThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isInit = true;
      state.error = action.error.message;
    });
  }
});

export const {
  getUserData,
  getUserLoading,
  getUserState,
  getUserError,
  getUserInit
} = userSlice.selectors;

export default userSlice.reducer;
