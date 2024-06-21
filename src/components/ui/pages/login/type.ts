import type { ChangeEvent } from 'react';
import type { PageUIProps } from '../common-type';

export type LoginUIProps = PageUIProps & {
  password: string;
  setPassword: (event: ChangeEvent<HTMLInputElement>) => void;
};
