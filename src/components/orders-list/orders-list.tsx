import { memo } from 'react';

import { OrdersListUI } from '@ui';

import type { FC } from 'react';
import type { OrdersListProps } from './type';

export const OrdersList: FC<OrdersListProps> = memo(({ orders }) => {
  const orderByDate = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return <OrdersListUI orderByDate={orderByDate} />;
});
