import React from "react";
import ToastContainer from "../toast-container";

export type ToastType = Pick<
  ToastContainer,
  "show" | "success" | "danger" | "warning" | "update" | "hide" | "hideAll" | "isOpen"
>;

const ToastContext = React.createContext({} as ToastType);

export default ToastContext;
