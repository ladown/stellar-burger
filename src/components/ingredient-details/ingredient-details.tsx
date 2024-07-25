import { useParams } from 'react-router-dom';
import { useMemo } from 'react';

import { Preloader, IngredientDetailsUI } from '@ui';
import { useSelector } from '@store';
import { getIngredientState } from '@slices/ingredients/ingredientsSlice';

import type { FC } from 'react';
import type { TIngredient } from '@utils/types.js';

export const IngredientDetails: FC = () => {
  const ingredientData = useSelector(getIngredientState);
  const { id: ingredientId } = useParams();

  const currentIngredient = useMemo(
    () =>
      ingredientData.ingredients.find(
        (item) => item._id === ingredientId
      ) as TIngredient,
    [ingredientData.ingredients, ingredientId]
  );

  if (ingredientData.isLoading || !ingredientData.ingredients?.length) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={currentIngredient} />;
};
