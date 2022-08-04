import { useEffect, useState } from "react";
import { Dimensions, ScaledSize } from "react-native";

export function useDimensions() {
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));

  const onChange = ({ window }: { window: ScaledSize }) => {
    setDimensions(window);
  };

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", onChange);

    return () => {
      if (typeof subscription?.remove === "function") {
        subscription.remove();
      } else {
        // React Native < 0.65
        Dimensions.removeEventListener("change", onChange);
      }
    };
  }, []);

  return dimensions;
}
