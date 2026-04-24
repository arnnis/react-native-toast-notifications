import React, { Component } from "react";
import {
  StyleSheet,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
  Dimensions, SafeAreaView,
} from "react-native";
import Toast, { ToastOptions, ToastProps } from "./toast";

const { height, width } = Dimensions.get("window");

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

  areIdsEqual = (id1: string, id2: string) => {
    return id1.replace(/--[.0-9]+$/, '') === id2.replace(/--[.0-9]+$/, '')
  };

  /**
   * Shows a new toast. Returns id
   */
  show = (message: string | JSX.Element, toastOptions?: ToastOptions) => {
    const id = (toastOptions?.id ? toastOptions.id + '--' : '') + Math.random();
    const onDestroy = () => {
      toastOptions?.onClose && toastOptions?.onClose();
      this.setState(state => ({ toasts: state.toasts.filter((t) => !this.areIdsEqual(t.id, id) || t.open) }));
    };

    this.hide(id);

    requestAnimationFrame(() => {
      this.setState(state => ({
        toasts: [
          {
            ...this.props,
            ...toastOptions,
            id,
            onDestroy,
            message,
            open: true,
            onHide: () => this.hide(id),
          },
          ...state.toasts.filter((t) => t.open),
        ],
      }));
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
    this.setState(state => ({
      toasts: state.toasts.map((t) =>
        this.areIdsEqual(t.id, id) ? { ...t, message, ...toastOptions } : t
      ),
    }));
  };

  /**
   * Removes a toast from stack
   */
  hide = (id: string) => {
    this.setState(state => ({
      toasts: state.toasts.map((t) =>
        this.areIdsEqual(t.id, id) && t.open ? { ...t, open: false } : t
      ),
    }));
  };

  /**
   * Removes all toasts in stack
   */
  hideAll = () => {
    this.setState(state => ({
      toasts: state.toasts.map((t) => ({ ...t, open: false })),
    }));
  };

  /**
   * Check if a toast is currently open
   */
  isOpen = (id: string) => {
    return this.state.toasts.some((t) => this.areIdsEqual(t.id, id) && t.open);
  }

  renderBottomToasts() {
    const { toasts } = this.state;
    let { offset, offsetBottom } = this.props;
    let style: ViewStyle = {
      bottom: offsetBottom || offset,
      width: width,
      justifyContent: "flex-end",
      flexDirection: "column",
    };
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : undefined}
        style={[styles.container, style]}
        pointerEvents="box-none"
      >
        <SafeAreaView>
          {toasts
            .filter((t) => !t.placement || t.placement === "bottom")
            .map((toast) => (
              <Toast key={toast.id} {...toast} />
            ))}
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }

  renderTopToasts() {
    const { toasts } = this.state;
    let { offset, offsetTop } = this.props;
    let style: ViewStyle = {
      top: offsetTop || offset,
      width: width,
      justifyContent: "flex-start",
      flexDirection: "column-reverse",
    };
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : undefined}
        style={[styles.container, style]}
        pointerEvents="box-none"
      >
        <SafeAreaView>
          {toasts
            .filter((t) => t.placement === "top")
            .map((toast) => (
              <Toast key={toast.id} {...toast} />
            ))}
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }

  renderCenterToasts() {
    const { toasts } = this.state;
    let { offset, offsetTop } = this.props;
    let style: ViewStyle = {
      top: offsetTop || offset,
      height: height,
      width: width,
      justifyContent: "center",
      flexDirection: "column-reverse",
    };

    const data = toasts.filter((t) => t.placement === "center");
    const foundToast = data.length > 0;

    if (!foundToast) return null;

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : undefined}
        style={[styles.container, style]}
        pointerEvents="box-none"
      >
        {toasts
          .filter((t) => t.placement === "center")
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
        {this.renderCenterToasts()}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    // @ts-ignore: fixed is available on web.
    position: Platform.OS === "web" ? "fixed" : "absolute",
    maxWidth: "100%",
    zIndex: 999999,
    elevation: 999999,
    alignSelf: 'center',
    ...(Platform.OS === "web" ? { overflow: "hidden", userSelect: 'none' } : null),
  },
  message: {
    color: "#333",
  },
});

export default ToastContainer;
