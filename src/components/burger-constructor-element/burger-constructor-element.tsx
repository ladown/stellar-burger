import { memo } from 'react';

import { BurgerConstructorElementUI } from '@ui';
import { useDispatch } from '@store';
import {
  removeIngredientFromBurgerConstructor,
  changeIngredientsBurgerConstructorOrder
} from '@slices/orderSlice';

import type { FC } from 'react';
import type { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(
        changeIngredientsBurgerConstructorOrder({
          ingredient,
          index,
          direction: 'down'
        })
      );
    };

    const handleMoveUp = () => {
      dispatch(
        changeIngredientsBurgerConstructorOrder({
          ingredient,
          index,
          direction: 'up'
        })
      );
    };

    const handleClose = () => {
      dispatch(removeIngredientFromBurgerConstructor(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
