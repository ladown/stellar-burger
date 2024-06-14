import { useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Preloader } from '@ui';
import { OrderInfoUI } from '@ui';
import { useSelector, useDispatch } from '@store';
import { getIngredientData } from '@slices/ingredientsSlice';
import { getOrdersState, getOrderByNumberThunk } from '@slices/ordersSlice';

import type { TIngredient } from '@utils-types';
import type { FC } from 'react';

export const OrderInfo: FC = () => {
  const { number: _orderId } = useParams();
  const ingredients = useSelector(getIngredientData);
  const {
    orderByNumber: orderData,
    isLoading,
    isInit
  } = useSelector(getOrdersState);
  const dispatch = useDispatch();

  const orderId = Number(_orderId);

  useEffect(() => {
    if (
      !orderData ||
      (typeof orderData === 'object' && orderData?.number !== orderId)
    ) {
      dispatch(getOrderByNumberThunk(orderId));
    }
  }, [dispatch, orderId]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!isInit || isLoading || !orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
