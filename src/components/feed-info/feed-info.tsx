import { FeedInfoUI } from '@ui';
import { useSelector } from '@store';
import { getFeedState } from '@slices/feedSlice';

import type { FC } from 'react';
import type { TOrder } from '@utils-types';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const feedState = useSelector(getFeedState);

  const readyOrders = getOrders(feedState.orders, 'done');

  const pendingOrders = getOrders(feedState.orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feedState}
    />
  );
};
