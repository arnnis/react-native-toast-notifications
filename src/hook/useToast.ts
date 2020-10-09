import { useContext } from "react";
import ToastContext from "./context";

const useToast = () => useContext(ToastContext);

export default useToast;
