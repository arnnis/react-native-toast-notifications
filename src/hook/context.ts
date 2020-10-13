import React from "react";

type Toast = React.RefObject<import("../toast-container").default>["current"];

const ToastContext = React.createContext(null as Toast);

export default ToastContext;
