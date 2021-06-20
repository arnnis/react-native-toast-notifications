import React, { FC, useEffect, useRef, useState } from "react";
import ToastContext from "./context";
import Toast, { Props } from "../toast-container";

const ToastProvider: FC<Props> = ({ children, ...props }) => {
  const toastRef = useRef(null);
  const [refState, setRefState] = useState({});

  useEffect(() => {
    setRefState(toastRef.current as any);
  }, []);

  return (
    <ToastContext.Provider value={refState as any}>
      {children}
      <Toast ref={toastRef} {...props} />
    </ToastContext.Provider>
  );
};

export default ToastProvider;
