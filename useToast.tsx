import styles from "~/styles/toast.module.css";
import { useState, useEffect, createContext, useContext } from "react";
import { ToastContextProps, ToastProps, ToasterProps } from "~/toast";

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const Toaster = ({ children, position }: ToasterProps) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = (props: ToastProps) => {
    const { variant = "default", message = "", duration = 3000, render } = props;
    const newToast: ToastProps = {
      variant,
      message,
      duration,
      render,
      isShow: true,
      position,
      id: String(Date.now()),
    };

    setToasts((prevState) => [...prevState, newToast]);
  };

  const handleToastClose = (id: string) => {
    setToasts((prevState) =>
      prevState.map((toast) =>
        toast.id === id ? { ...toast, isShow: false } : toast
      )
    );
  };

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    toasts.forEach((toast) => {
      const timer = setTimeout(() => {
        setToasts((prevState) =>
          prevState.map((t) => (t.id === toast.id ? { ...t, isShow: false } : t))
        );
      }, toast.duration || 3000);

      timers.push(timer);
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {toasts.map((toast) =>
        toast.isShow ? (
          <div
            key={toast.id}
            className={`${styles.toast} ${styles[toast.variant]} ${
              styles.active
            } `}
            style={{
              animationDuration: `${(toast.duration || 3000) / 1000}`,
            }}
          >
            {toast.render ? toast.render() : <div>{toast.message}</div>}
            <span
              className={styles.close}
              onClick={() => handleToastClose(toast.id)}
            ></span>
          </div>
        ) : null
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};