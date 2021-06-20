import { useContext } from "react";
import ToastContext, { ToastType } from "./context";

const useToast = (): ToastType => useContext(ToastContext);

export default useToast;
