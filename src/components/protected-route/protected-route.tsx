import type { ReactElement } from 'react';

export type TProtectedRouteProps = {
  children: ReactElement;
};

export const ProtectedRoute = (props: TProtectedRouteProps) => props.children;
