import React from "react";
import { View, Text } from "react-native";
import { useToast } from "react-native-fast-toast";
import { styles } from "./App";

const HookExample = () => {
  const toastHook = useToast();
  return (
    <Text
      onPress={() => {
        toastHook?.show("toast call using hook");
      }}
      style={[styles.test, { marginTop: 30 }]}
    >
      call toast using hook
    </Text>
  );
};

export default HookExample;
