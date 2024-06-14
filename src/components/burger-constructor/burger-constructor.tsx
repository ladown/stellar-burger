import { useMemo, useState, useEffect } from 'react';

import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '@store';
import {
  getOrderState,
  orderBurgerThunk,
  removeOrderModalData
} from '@slices/orderSlice';
import { getUserData } from '@slices/userSlice';

import type { FC } from 'react';
import type { TConstructorIngredient } from '@utils-types';

export const BurgerConstructor: FC = () => {
  const {
    burgerConstructor: constructorItems,
    orderRequest,
    orderModalData
  } = useSelector(getOrderState);
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();
  const [isButtonDisabled, setIsButtonDisabled] = useState(
    !userData || !constructorItems.bun || !constructorItems.ingredients.length
  );

  useEffect(() => {
    setIsButtonDisabled(
      !userData || !constructorItems.bun || !constructorItems.ingredients.length
    );
  }, [userData, constructorItems]);

  const onOrderClick = () => {
    if (constructorItems.bun) {
      setIsButtonDisabled(true);

      const orderData = [
        constructorItems.bun._id,
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ingredient) => ingredient._id)
      ];

      dispatch(orderBurgerThunk(orderData));
    }
  };

  const closeOrderModal = () => {
    dispatch(removeOrderModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      constructorItems={constructorItems}
      orderRequest={orderRequest}
      orderModalData={orderModalData}
      price={price}
      isButtonDisabled={isButtonDisabled}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
