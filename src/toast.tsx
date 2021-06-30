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
  Dimensions,
  Platform,
  PanResponderGestureState,
} from "react-native";

const dims = Dimensions.get("window");

export interface ToastOptions {
  id?: string;
  icon?: JSX.Element;
  type?: "normal" | "success" | "danger" | "warning";
  duration?: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;

  successIcon?: JSX.Element;
  dangerIcon?: JSX.Element;
  warningIcon?: JSX.Element;

  successColor?: string;
  dangerColor?: string;
  warningColor?: string;
  normalColor?: string;

  onPress?(id: string): void;
}

export interface ToastProps extends ToastOptions {
  id: string;
  onClose(): void;
  message: string | JSX.Element;
  placement?: "top" | "bottom";
}

const Toast: FC<ToastProps> = ({
  id,
  onClose,
  icon,
  type = "normal",
  message,
  duration = 5000,
  style,
  textStyle,

  successIcon,
  dangerIcon,
  warningIcon,

  successColor,
  dangerColor,
  warningColor,
  normalColor,

  placement,

  onPress,
}) => {
  const containerRef = useRef<View>(null);
  const [animation] = useState(new Animated.Value(0));
  const panResponderRef = useRef<PanResponderInstance>();
  const panResponderAnimRef = useRef<Animated.ValueXY>();

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      useNativeDriver: true,
      duration: 250,
    }).start();

    let closeTimeout: NodeJS.Timeout | null = null;

    if (duration !== 0 && typeof duration === "number") {
      closeTimeout = setTimeout(() => {
        Animated.timing(animation, {
          toValue: 0,
          useNativeDriver: true,
          duration: 250,
        }).start(() => onClose());
      }, duration);
    }

    return () => {
      closeTimeout && clearTimeout(closeTimeout);
    };
  }, []);

  const panReleaseToLeft = (gestureState: PanResponderGestureState) => {
    Animated.timing(getPanResponderAnim(), {
      toValue: { x: (-dims.width / 10) * 9, y: gestureState.dy },
      useNativeDriver: true,
      duration: 250,
    }).start(() => onClose());
  };

  const panReleaseToRight = (gestureState: PanResponderGestureState) => {
    Animated.timing(getPanResponderAnim(), {
      toValue: { x: (dims.width / 10) * 9, y: gestureState.dy },
      useNativeDriver: true,
      duration: 250,
    }).start(() => onClose());
  };

  const getPanResponder = () => {
    if (panResponderRef.current) return panResponderRef.current;
    panResponderRef.current = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        getPanResponderAnim()?.setValue({
          x: gestureState.dx,
          y: gestureState.dy,
        });
      },
      onPanResponderRelease: (_, gestureState) => {
        console.log("gesture release:", gestureState);
        if (gestureState.dx > 50) {
          panReleaseToRight(gestureState);
        } else if (gestureState.dx < -50) {
          panReleaseToLeft(gestureState);
        } else {
          Animated.spring(getPanResponderAnim(), {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
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

  const animationStyle: Animated.WithAnimatedObject<ViewStyle> = {
    opacity: animation,
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: placement === "bottom" ? [20, 0] : [0, 20], // 0 : 150, 0.5 : 75, 1 : 0
        }),
      },
      getPanResponderAnim().getTranslateTransform()[0],
    ],
  };

  let backgroundColor = "";
  switch (type) {
    case "success":
      backgroundColor = successColor || "#00C851";
      break;
    case "danger":
      backgroundColor = dangerColor || "#ff4444";
      break;
    case "warning":
      backgroundColor = warningColor || "#ffbb33";
      break;
    default:
      backgroundColor = normalColor || "#333";
  }

  const renderToast = () => (
    <Animated.View
      ref={containerRef}
      {...getPanResponder().panHandlers}
      style={[styles.container, animationStyle, { backgroundColor }, style]}
    >
      {icon ? <View style={styles.iconContainer}>{icon}</View> : null}
      {React.isValidElement(message) ? (
        message
      ) : (
        <Text style={[styles.message, textStyle]}>{message}</Text>
      )}
    </Animated.View>
  );

  return onPress ? (
    <TouchableWithoutFeedback onPress={() => onPress(id)}>
      {renderToast()}
    </TouchableWithoutFeedback>
  ) : (
    renderToast()
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    maxWidth: (dims.width / 10) * 9,
    ...(Platform.OS === "web" ? { cursor: "pointer" } : null),
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
