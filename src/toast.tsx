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
} from "react-native";

export interface ToastOptions {
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
  duration = 3000,
  style,
  textStyle,

  successIcon,
  dangerIcon,
  warningIcon,

  successColor,
  dangerColor,
  warningColor,

  placement,

  onPress,
}) => {
  const containerRef = useRef<View>(null);
  const [animation] = useState(new Animated.Value(0));

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

  const animationStyle = {
    opacity: animation,
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: placement === "bottom" ? [20, 0] : [0, 20], // 0 : 150, 0.5 : 75, 1 : 0
        }),
      },
    ],
  };

  let backgroundColor = "#333";
  switch (type) {
    case "success":
      backgroundColor = successColor || "#00C851";
      break;
    case "danger":
      backgroundColor = dangerColor || "#ff4444";
      break;
    case "warning":
      backgroundColor = warningColor || "#ffbb33";
  }

  const renderToast = () => (
    <Animated.View
      ref={containerRef}
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
