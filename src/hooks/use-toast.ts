import { useState } from 'react';

type ToastProps = {
  id?: number;
  title?: string;
  description?: string;
  type?: 'background' | 'foreground';
  duration?: number;
  action?: React.ReactNode;
};

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = (props: ToastProps) => {
    const id = Date.now();
    const newToast = { ...props, id };
    
    setToasts((currentToasts) => [...currentToasts, newToast]);

    if (props.duration !== Infinity) {
      setTimeout(() => {
        setToasts((currentToasts) => 
          currentToasts.filter((toast) => toast.id !== id)
        );
      }, props.duration || 3000);
    }
  };

  return { toast, toasts };
} 