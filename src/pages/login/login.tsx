import { useState } from 'react';

import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '@store';
import { getUserError, loginUserThunk } from '@slices/userSlice';

import type { FC, SyntheticEvent } from 'react';

export const Login: FC = () => {
  const userError = useSelector(getUserError);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      loginUserThunk({
        email,
        password
      })
    );
  };

  return (
    <LoginUI
      errorText={userError}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
