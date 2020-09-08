import React, { FC, useRef, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
  StyleProp,
  ViewStyle,
  TextStyle,
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
}

export interface ToastProps extends ToastOptions {
  id: string;
  onClose(id: string): void;
  message: string;
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
}) => {
  const containerRef = useRef<View>(null);
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      useNativeDriver: true,
      duration: 250,
    }).start();

    if (duration !== undefined && typeof duration === "number") {
      setTimeout(() => {
        Animated.timing(animation, {
          toValue: 0,
          useNativeDriver: true,
          duration: 250,
        }).start(() => onClose(id));
      }, duration);
    }
  }, []);

  const renderIcon = () => {
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
    return icon;
  };

  const animationStyle: Animated.WithAnimatedValue<StyleProp<ViewStyle>> = {
    opacity: animation,
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0], // 0 : 150, 0.5 : 75, 1 : 0
        }),
      },
    ],
    // height: hideAnimation.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [0, 40],
    // }),
  };

  let backgroundColor = "#333";
  switch (type) {
    case "success":
      backgroundColor = "#00C851";
      break;
    case "danger":
      backgroundColor = "#ff4444";
      break;
    case "warning":
      backgroundColor = "#ffbb33";
  }

  return (
    <Animated.View
      ref={containerRef}
      style={[styles.container, animationStyle, { backgroundColor }, style]}
    >
      <View style={styles.iconContainer}>{renderIcon()}</View>

      <Animated.Text style={[styles.message, textStyle]}>
        {message}
      </Animated.Text>
    </Animated.View>
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
