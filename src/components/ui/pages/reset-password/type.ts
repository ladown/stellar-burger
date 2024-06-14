import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import type { PageUIProps } from '../common-type';

export type ResetPasswordUIProps = Omit<PageUIProps, 'email' | 'setEmail'> & {
  password: string;
  token: string;
  setPassword: (event: ChangeEvent<HTMLInputElement>) => void;
  setToken: Dispatch<SetStateAction<string>>;
};
