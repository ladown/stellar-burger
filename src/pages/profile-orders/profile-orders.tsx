import { useEffect } from 'react';

import { ProfileOrdersUI } from '@ui-pages';
import { useSelector, useDispatch } from '@store';
import { getOrders, getOrdersThunk } from '@slices/ordersSlice';

import type { FC } from 'react';

export const ProfileOrders: FC = () => {
  const orders = useSelector(getOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersThunk());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
