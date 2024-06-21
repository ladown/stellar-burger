import type { ChangeEvent } from 'react';
import type { PageUIProps } from '../common-type';

export type RegisterUIProps = PageUIProps & {
  password: string;
  userName: string;
  setPassword: (event: ChangeEvent<HTMLInputElement>) => void;
  setUserName: (event: ChangeEvent<HTMLInputElement>) => void;
};
