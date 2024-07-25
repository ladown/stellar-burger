import { useState } from 'react';

import { RegisterUI } from '@ui-pages';
import { getUserError, registerUserThunk } from '@slices/user/userSlice';
import { useDispatch, useSelector } from '@store';
import { useForm } from '@hooks/useForm';

import type { FC, SyntheticEvent } from 'react';

export const Register: FC = () => {
  const { values, handleChange } = useForm({
    name: '',
    password: '',
    email: ''
  });
  const userError = useSelector(getUserError);
  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(registerUserThunk(values));
  };

  return (
    <RegisterUI
      errorText={userError}
      email={values.email}
      userName={values.name}
      password={values.password}
      setEmail={handleChange}
      setPassword={handleChange}
      setUserName={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
