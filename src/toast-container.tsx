import React, { Component } from "react";
import {
  StyleSheet,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Toast, { ToastOptions, ToastProps } from "./toast";

export interface Props extends ToastOptions {
  renderToast?(toast: ToastProps): JSX.Element;
  renderType?: { [type: string]: (toast: ToastProps) => JSX.Element };
  offset?: number;
  offsetTop?: number;
  offsetBottom?: number;
  swipeEnabled?: boolean;
}

interface State {
  toasts: Array<ToastProps>;
}

class ToastContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      toasts: [],
    };
  }

  static defaultProps: Props = {
    placement: "bottom",
    offset: 10,
    swipeEnabled: true,
  };

  /**
   * Shows a new toast. Returns id
   */
  show = (message: string | JSX.Element, toastOptions?: ToastOptions) => {
    let id = toastOptions?.id || Math.random().toString();
    const onDestroy = () => {
      toastOptions?.onClose && toastOptions?.onClose();
      this.setState({ toasts: this.state.toasts.filter((t) => t.id !== id) });
    };

    requestAnimationFrame(() => {
      this.setState({ toasts: this.state.toasts.filter((t) => t.id !== id) });
      this.setState({
        toasts: [
          {
            id,
            onDestroy,
            message,
            open: true,
            onHide: () => this.hide(id),
            ...this.props,
            ...toastOptions,
          },
          ...this.state.toasts,
        ],
      });
    });

    return id;
  };

  /**
   * Updates a toast, To use this create you must pass an id to show method first, then pass it here to update the toast.
   */
  update = (
    id: string,
    message: string | JSX.Element,
    toastOptions?: ToastOptions
  ) => {
    this.setState({
      toasts: this.state.toasts.map((toast) =>
        toast.id === id ? { ...toast, message, ...toastOptions } : toast
      ),
    });
  };

  /**
   * Removes a toast from stack
   */
  hide = (id: string) => {
    this.setState({
      toasts: this.state.toasts.map((t) =>
        t.id === id ? { ...t, open: false } : t
      ),
    });
  };

  /**
   * Removes all toasts in stack
   */
  hideAll = () => {
    this.setState({
      toasts: this.state.toasts.map((t) => ({ ...t, open: false })),
    });
  };

  renderBottomToasts() {
    const { toasts } = this.state;
    let { offset, offsetBottom } = this.props;
    let style: ViewStyle = {
      bottom: offsetBottom || offset,
      justifyContent: "flex-end",
      flexDirection: "column",
    };
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : undefined}
        style={[styles.container, style]}
        pointerEvents="box-none"
      >
        {toasts
          .filter((t) => !t.placement || t.placement === "bottom")
          .map((toast) => (
            <Toast key={toast.id} {...toast} />
          ))}
      </KeyboardAvoidingView>
    );
  }

  renderTopToasts() {
    const { toasts } = this.state;
    let { offset, offsetTop } = this.props;
    let style: ViewStyle = {
      top: offsetTop || offset,
      justifyContent: "flex-start",
      flexDirection: "column-reverse",
    };
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : undefined}
        style={[styles.container, style]}
        pointerEvents="box-none"
      >
        {toasts
          .filter((t) => t.placement === "top")
          .map((toast) => (
            <Toast key={toast.id} {...toast} />
          ))}
      </KeyboardAvoidingView>
    );
  }

  render() {
    return (
      <>
        {this.renderTopToasts()}
        {this.renderBottomToasts()}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    position: "absolute",
    width: "100%",
    maxWidth: "100%",
    zIndex: 999999,
    left: 0,
    right: 0,
    ...(Platform.OS === "web" ? { overflow: "hidden" } : null),
  },
  message: {
    color: "#333",
  },
});

export default ToastContainer;
