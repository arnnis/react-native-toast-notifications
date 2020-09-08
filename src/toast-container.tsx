import React, { Component } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Toast, { ToastOptions, ToastProps } from "./toast";

const dims = Dimensions.get("window");

interface State {
  toasts: Array<ToastProps>;
}

class ToastContainer extends Component<ToastOptions, State> {
  constructor(props: ToastOptions) {
    super(props);
    this.state = {
      toasts: [],
    };
  }

  show = (message: string, toastOptions?: ToastOptions) => {
    let id = Math.random().toString();
    const onClose = () => this.hide(id);
    this.setState({ toasts: this.state.toasts.filter((t) => t.id !== id) });
    this.setState({
      toasts: [{ id, onClose, message, ...toastOptions }, ...this.state.toasts],
    });
  };

  update = (id: string, message: string, toastOptions?: ToastOptions) => {
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
    return (
      <View style={styles.container}>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...this.props} {...toast} />
        ))}
      </View>
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
    // backgroundColor: "green",
    borderRadius: 5,
    zIndex: 999,
  },
  message: {
    color: "#333",
  },
});

export default ToastContainer;
