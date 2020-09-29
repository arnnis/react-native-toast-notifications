import React from "react";

type Toast = React.RefObject<
  import("react-native-fast-toast").default
>["current"];

const ToastContext = React.createContext(null as Toast);

export default ToastContext;
