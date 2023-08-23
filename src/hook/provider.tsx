import React, { FC, useEffect, useRef, useState } from "react";
import ToastContext, { ToastType } from "./context";
import Toast, { Props } from "../toast-container";

type PropsWithChildren = Props & {
  children: React.ReactNode;
}

export let GlobalToast: ToastType

const ToastProvider: FC<PropsWithChildren> = ({ children, ...props }) => {
  const toastRef = useRef(null);
  const [refState, setRefState] = useState({});

  useEffect(() => {
    setRefState(toastRef.current as any);
    GlobalToast = toastRef.current as any
  }, []);

  return (
    <ToastContext.Provider value={refState as any}>
      {children}
      <Toast ref={toastRef} {...props} />
    </ToastContext.Provider>
  );
};

export default ToastProvider;
