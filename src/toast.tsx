import React, { FC, useRef, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
  StyleProp,
  ViewStyle,
  TextStyle,
  Text,
  TouchableWithoutFeedback,
  PanResponder,
  PanResponderInstance,
  PanResponderGestureState,
  Platform,
} from "react-native";
import { useDimensions } from "./utils/useDimensions";

export interface ToastOptions {
  /**
   * Id is optional, you may provide an id only if you want to update toast later using toast.update()
   */
  id?: string;

  /**
   * Customize toast icon
   */
  icon?: JSX.Element;

  /**
   * Toast types, You can implement your custom types with JSX using renderType method on ToastContainer.
   */
  type?: "normal" | "success" | "danger" | "warning" | string;

  /**
   * In ms, How long toast will stay before it go away
   */
  duration?: number;

  /**
   * Customize when toast should be placed
   */
  placement?: "top" | "bottom" | "center";

  /**
   * Customize style of toast
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Customize style of toast text
   */
  textStyle?: StyleProp<TextStyle>;

  /**
   * Customize how fast toast will show and hide
   */
  animationDuration?: number;

  /**
   * Customize how toast is animated when added or removed
   */
  animationType?: "slide-in" | "zoom-in";

  /**
   * Customize success type icon
   */
  successIcon?: JSX.Element;

  /**
   * Customize danger type icon
   */
  dangerIcon?: JSX.Element;

  /**
   * Customize warning type icon
   */
  warningIcon?: JSX.Element;

  /**
   * Customize success type color. changes toast background color
   */
  successColor?: string;

  /**
   * Customize danger type color. changes toast background color
   */
  dangerColor?: string;

  /**
   * Customize warning type color. changes toast background color
   */
  warningColor?: string;

  /**
   * Customize normal type color. changes toast background color
   */
  normalColor?: string;

  /**
   * Register event for when toast is pressed. If you're using a custom toast you have to pass this to a Touchable.
   */
  onPress?(id: string): void;

  /**
   * Execute event after toast is closed
   */
  onClose?(): void;

  /**
   * Payload data for custom toasts. You can pass whatever you want
   */
  data?: any;

  swipeEnabled?: boolean;
}

export interface ToastProps extends ToastOptions {
  id: string;
  onDestroy(): void;
  message: string | JSX.Element;
  open: boolean;
  renderToast?(toast: ToastProps): JSX.Element;
  renderType?: { [type: string]: (toast: ToastProps) => JSX.Element };
  onHide(): void;
}

const Toast: FC<ToastProps> = (props) => {
  let {
    id,
    onDestroy,
    icon,
    type = "normal",
    message,
    duration = 5000,
    style,
    textStyle,
    animationDuration = 250,
    animationType = "slide-in",
    successIcon,
    dangerIcon,
    warningIcon,
    successColor,
    dangerColor,
    warningColor,
    normalColor,
    placement,
    swipeEnabled,
    onPress,
  } = props;

  const containerRef = useRef<View>(null);
  const [animation] = useState(new Animated.Value(0));
  const panResponderRef = useRef<PanResponderInstance>();
  const panResponderAnimRef = useRef<Animated.ValueXY>();
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dims = useDimensions();

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      useNativeDriver: Platform.OS !== "web",
      duration: animationDuration,
    }).start();
    if (duration !== 0 && typeof duration === "number") {
      closeTimeoutRef.current = setTimeout(() => {
        handleClose();
      }, duration);
    }

    return () => {
      closeTimeoutRef.current && clearTimeout(closeTimeoutRef.current);
    };
  }, [duration]);

  // Handles hide & hideAll
  useEffect(() => {
    if (!props.open) {
      // Unregister close timeout
      closeTimeoutRef.current && clearTimeout(closeTimeoutRef.current);

      // Close animation them remove from stack.
      handleClose();
    }
  }, [props.open]);

  const handleClose = () => {
    Animated.timing(animation, {
      toValue: 0,
      useNativeDriver: Platform.OS !== "web",
      duration: animationDuration,
    }).start(() => onDestroy());
  };

  const panReleaseToLeft = (gestureState: PanResponderGestureState) => {
    Animated.timing(getPanResponderAnim(), {
      toValue: { x: (-dims.width / 10) * 9, y: gestureState.dy },
      useNativeDriver: Platform.OS !== "web",
      duration: 250,
    }).start(() => onDestroy());
  };

  const panReleaseToRight = (gestureState: PanResponderGestureState) => {
    Animated.timing(getPanResponderAnim(), {
      toValue: { x: (dims.width / 10) * 9, y: gestureState.dy },
      useNativeDriver: Platform.OS !== "web",
      duration: 250,
    }).start(() => onDestroy());
  };

  const getPanResponder = () => {
    if (panResponderRef.current) return panResponderRef.current;
    const swipeThreshold = Platform.OS === "android" ? 10 : 0;
    panResponderRef.current = PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        //return true if user is swiping, return false if it's a single click
        return (
          Math.abs(gestureState.dx) > swipeThreshold ||
          Math.abs(gestureState.dy) > swipeThreshold
        );
      },
      onPanResponderMove: (_, gestureState) => {
        getPanResponderAnim()?.setValue({
          x: gestureState.dx,
          y: gestureState.dy,
        });
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 50) {
          panReleaseToRight(gestureState);
        } else if (gestureState.dx < -50) {
          panReleaseToLeft(gestureState);
        } else {
          Animated.spring(getPanResponderAnim(), {
            toValue: { x: 0, y: 0 },
            useNativeDriver: Platform.OS !== "web",
          }).start();
        }
      },
    });
    return panResponderRef.current;
  };

  const getPanResponderAnim = () => {
    if (panResponderAnimRef.current) return panResponderAnimRef.current;
    panResponderAnimRef.current = new Animated.ValueXY({ x: 0, y: 0 });
    return panResponderAnimRef.current;
  };

  if (icon === undefined) {
    switch (type) {
      case "success": {
        if (successIcon) {
          icon = successIcon;
        }
        break;
      }

      case "danger": {
        if (dangerIcon) {
          icon = dangerIcon;
        }
        break;
      }
      case "warning": {
        if (warningIcon) {
          icon = warningIcon;
        }
        break;
      }
    }
  }

  let backgroundColor = "";
  switch (type) {
    case "success":
      backgroundColor = successColor || "rgb(46, 125, 50)";
      break;
    case "danger":
      backgroundColor = dangerColor || "rgb(211, 47, 47)";
      break;
    case "warning":
      backgroundColor = warningColor || "rgb(237, 108, 2)";
      break;
    default:
      backgroundColor = normalColor || "#333";
  }

  const animationStyle: Animated.WithAnimatedObject<ViewStyle> = {
    opacity: animation,
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: placement === "bottom" ? [20, 0] : [-20, 0], // 0 : 150, 0.5 : 75, 1 : 0
        }),
      },
    ],
  };

  if (swipeEnabled) {
    animationStyle.transform?.push(
      getPanResponderAnim().getTranslateTransform()[0]
    );
  }

  if (animationType === "zoom-in") {
    animationStyle.transform?.push({
      scale: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0.7, 1],
      }),
    });
  }

  return (
    <Animated.View
      pointerEvents={"box-none"}
      ref={containerRef}
      {...(swipeEnabled ? getPanResponder().panHandlers : null)}
      style={[styles.container, animationStyle]}
    >
      {props.renderType && props.renderType[type] ? (
        props.renderType[type](props)
      ) : props.renderToast ? (
        props.renderToast(props)
      ) : (
        <TouchableWithoutFeedback
          disabled={!onPress}
          onPress={() => onPress && onPress(id)}
        >
          <View
            style={[
              styles.toastContainer,
              { maxWidth: (dims.width / 10) * 9, backgroundColor },
              style,
            ]}
          >
            {icon ? <View style={styles.iconContainer}>{icon}</View> : null}
            {React.isValidElement(message) ? (
              message
            ) : (
              <Text style={[styles.message, textStyle]}>{message}</Text>
            )}
          </View>
        </TouchableWithoutFeedback>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%", alignItems: "center" },
  toastContainer: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  message: {
    color: "#fff",
    fontWeight: "500",
  },
  iconContainer: {
    marginRight: 5,
  },
});

export default Toast;
