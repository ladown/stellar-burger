import { useState } from 'react';

import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '@store';
import { getUserError, loginUserThunk } from '@slices/user/userSlice';
import { useForm } from '@hooks/useForm';

import type { FC, SyntheticEvent } from 'react';

export const Login: FC = () => {
  const userError = useSelector(getUserError);
  const dispatch = useDispatch();
  const { values, handleChange } = useForm({
    email: '',
    password: ''
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(loginUserThunk(values));
  };

  return (
    <LoginUI
      errorText={userError}
      email={values.email}
      setEmail={handleChange}
      password={values.password}
      setPassword={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
