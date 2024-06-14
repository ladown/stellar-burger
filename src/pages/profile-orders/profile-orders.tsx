import { useEffect } from 'react';

import { ProfileOrdersUI } from '@ui-pages';
import { Preloader } from '@ui';
import { useSelector, useDispatch } from '@store';
import { getOrdersState, getOrdersThunk } from '@slices/ordersSlice';

import type { FC } from 'react';

export const ProfileOrders: FC = () => {
  const ordersState = useSelector(getOrdersState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersThunk());
  }, [dispatch]);

  if (!ordersState.isInit || ordersState.isLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={ordersState.orders} />;
};
