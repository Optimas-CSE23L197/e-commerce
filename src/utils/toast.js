import { toast } from "react-toastify";
import { Bounce } from "react-toastify";

const defaultOptions = {
  position: "top-right",
  autoClose: 3000,
  pauseOnHover: false,
  closeOnClick: true,
  theme: "dark",
  transition: Bounce,
};

export const Toast = {
  success: (message) => {
    toast.success(message, defaultOptions);
  },

  error: (message) => {
    toast.error(message, defaultOptions);
  },

  warning: (message) => {
    toast.warning(message, defaultOptions);
  },

  info: (message) => {
    toast.info(message, defaultOptions);
  },

  default: (message) => {
    toast(message, defaultOptions);
  },
};
