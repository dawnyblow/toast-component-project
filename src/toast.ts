import { ReactNode } from "react";

type ToastVariant = "default" | "success";

export interface ToastProps {
  id: string;
  variant?: ToastVariant;
  message?: string;
  duration?: number;
  render?: () => React.ReactNode;
  isShow?: boolean;
  position?: string;
}

export interface ToastContextProps {
  toast: (props: ToastProps) => void;
}

export interface ToasterProps {
  children: ReactNode;
}
