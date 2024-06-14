import { AppHeaderUI } from '@ui';
import { useSelector } from '@store';
import { getUserData } from '@slices/userSlice';

import type { FC } from 'react';

export const AppHeader: FC = () => {
  const userData = useSelector(getUserData);

  return <AppHeaderUI userName={userData?.name || ''} />;
};
