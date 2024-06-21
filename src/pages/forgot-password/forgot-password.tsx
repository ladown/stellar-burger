import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ForgotPasswordUI } from '@ui-pages';
import { useDispatch, useSelector } from '@store';
import { forgotPasswordUserThunk, getUserError } from '@slices/userSlice';
import { useForm } from '@hooks/useForm';

import type { FC, SyntheticEvent } from 'react';

export const ForgotPassword: FC = () => {
  const { values, handleChange } = useForm({
    email: ''
  });
  const userError = useSelector(getUserError);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(forgotPasswordUserThunk(values)).then(() => {
      localStorage.setItem('resetPassword', 'true');
      navigate('/reset-password', { replace: true });
    });
  };

  return (
    <ForgotPasswordUI
      errorText={userError}
      email={values.email}
      setEmail={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
