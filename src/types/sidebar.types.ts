import { ReactNode } from "react";

export type TSidebarItem = {
  key: string;
  icon: ReactNode;
  label: ReactNode;
  children?: TSidebarItem[];
  disabled?: boolean;
};
