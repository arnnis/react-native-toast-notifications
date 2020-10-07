import React, { Component } from "react";
import { View, StyleSheet, Dimensions, ViewStyle, KeyboardAvoidingView, Platform } from "react-native";
import Toast, { ToastOptions, ToastProps } from "./toast";

const dims = Dimensions.get("window");

export interface Props extends ToastOptions {
  offset?: number;
  placement: "top" | "bottom";
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

  static defaultProps = {
    placement: "bottom",
    offset: 60,
  };

  show = (message: string | JSX.Element, toastOptions?: ToastOptions) => {
    let id = Math.random().toString();
    const onClose = () => this.hide(id);

    requestAnimationFrame(() => {
      this.setState({ toasts: this.state.toasts.filter((t) => t.id !== id) });
      this.setState({
        toasts: [
          {
            id,
            onClose,
            message,
            ...toastOptions,
          },
          ...this.state.toasts,
        ],
      });
    });

    return id;
  };

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

  hide = (id: string) => {
    this.setState({ toasts: this.state.toasts.filter((t) => t.id !== id) });
  };

  render() {
    const { toasts } = this.state;
    let { placement, offset } = this.props;

    let style: ViewStyle = {
      bottom: placement === "bottom" ? offset : undefined,
      top: placement === "top" ? offset : undefined,
      justifyContent: placement === "bottom" ? "flex-end" : "flex-start",
      flexDirection: placement === "bottom" ? "column" : "column-reverse",
    };

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : undefined}
        style={[styles.container, style]}
        pointerEvents="box-none">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...this.props} {...toast} />
        ))}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    position: "absolute",
    maxWidth: dims.width * 10 * 9,
    bottom: 100,
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 5,
    zIndex: 999,
    left: "10%",
    right: "10%",
  },
  message: {
    color: "#333",
  },
});

export default ToastContainer;
