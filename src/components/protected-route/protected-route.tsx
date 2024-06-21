import { Navigate, useLocation } from 'react-router-dom';

import { Preloader } from '@ui';
import { useSelector } from '@store';
import { getUserState } from '@slices/userSlice';

import type { ReactElement } from 'react';

export type TProtectedRouteProps = {
  children: ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = (props: TProtectedRouteProps) => {
  const userState = useSelector(getUserState);
  const location = useLocation();

  if (!userState.isInit || userState.isLoading) {
    return <Preloader />;
  }

  if (userState.user === undefined && !props.onlyUnAuth) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (props.onlyUnAuth && userState.user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return props.children;
};
