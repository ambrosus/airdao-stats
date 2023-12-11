// Utils
import { toast } from 'react-toastify';

export function success(text: string, autoClose?: number) {
  if (!toast.isActive(text)) {
    toast.success(text, {
      position: 'top-right',
      autoClose: autoClose || 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      toastId: text,
    });
  }
}

export function info(text: string, autoClose?: number) {
  if (!toast.isActive(text)) {
    toast.info(text, {
      position: 'top-right',
      autoClose: autoClose || 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      toastId: text,
    });
  }
}
