import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ResetPasswordUI } from '@ui-pages';
import { useDispatch, useSelector } from '@store';
import { getUserError, resetPasswordUserThunk } from '@slices/userSlice';
import { useForm } from '@hooks/useForm';

import type { FC, SyntheticEvent } from 'react';

export const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const { values, handleChange } = useForm({
    password: ''
  });
  const [token, setToken] = useState('');
  const userError = useSelector(getUserError);
  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(resetPasswordUserThunk({ password: values.password, token })).then(
      () => {
        localStorage.removeItem('resetPassword');
        navigate('/login');
      }
    );
  };

  useEffect(() => {
    if (!localStorage.getItem('resetPassword')) {
      navigate('/forgot-password', { replace: true });
    }
  }, [navigate]);

  return (
    <ResetPasswordUI
      errorText={userError}
      password={values.password}
      token={token}
      setPassword={handleChange}
      setToken={setToken}
      handleSubmit={handleSubmit}
    />
  );
};
