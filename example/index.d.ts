type ToastType = import("react-native-fast-toast").ToastType

declare global {
  const toast: ToastType;
}

declare var toast: ToastType;
