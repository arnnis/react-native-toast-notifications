import React, { FC, useEffect, useRef, useState } from "react";
import ToastContext from "./context";
import Toast from "../toast-container";

const ToastProvider: FC = ({ children }) => {
  const toastRef = useRef(null);
  const [refState, setRefState] = useState(null);

  useEffect(() => {
    setRefState(toastRef.current);
  }, []);

  return (
    <ToastContext.Provider value={refState}>
      {children}
      <Toast ref={toastRef} />
    </ToastContext.Provider>
  );
};

export default ToastProvider;
