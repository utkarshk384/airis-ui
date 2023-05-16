import toast from "react-hot-toast";

/* Types */
import type { DefaultToastOptions } from "react-hot-toast";

export { toast as Toast };

export const defaultOptions: DefaultToastOptions = {
  position: "bottom-right",
  style: {
    borderLeft: "6px solid transparent",
    paddingBlock: "1rem",
    paddingInline: "1.25rem",
  },
  loading: {
    className: "!border-black",
  },
  success: {
    className: "!border-green-500",
    duration: 3000,
    iconTheme: {
      primary: "rgb(34 197 94)",
      secondary: "#ffffff",
    },
  },
  error: {
    className: "!border-red-500",
    duration: 5000,
    iconTheme: {
      primary: "rgb(239 68 68)",
      secondary: "#ffffff",
    },
  },
};
