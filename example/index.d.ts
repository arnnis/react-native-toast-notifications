type Toast = React.RefObject<
  import("react-native-fast-toast").default
>["current"];

declare global {
  const toast: Toast;
}

declare var toast: Toast;
