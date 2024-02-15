import { ReactNode } from "react";

export type TRoutesPath = {
  name: string;
  path?: string | undefined;
  icon: ReactNode;
  element?: ReactNode;
  children?: TRoutesPath[] | undefined;
};

export type TRoute = {
  path: string;
  element: ReactNode;
};
