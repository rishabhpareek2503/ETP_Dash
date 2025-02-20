import { useState } from 'react';

type ToastProps = {
  title?: string;
  description?: string;
  type?: 'default' | 'success' | 'error' | 'warning';
  duration?: number;
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