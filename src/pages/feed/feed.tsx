import { useEffect } from 'react';

import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { useSelector, useDispatch } from '@store';
import { getFeedState, getFeedsThunk } from '@slices/feedSlice';

import type { FC } from 'react';

export const Feed: FC = () => {
  const feedState = useSelector(getFeedState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedsThunk());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(getFeedsThunk());
  };

  if (!feedState.isInit || feedState.isLoading) {
    return <Preloader />;
  }

  if (feedState.orders.length < 1) {
    return <p>Пока заказов нет :(</p>;
  }

  return <FeedUI orders={feedState.orders} handleGetFeeds={handleGetFeeds} />;
};
