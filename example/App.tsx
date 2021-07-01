import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ToastProvider } from "react-native-fast-toast";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Home from "./Home";

export default function App() {
  return (
    <ToastProvider
      placement="bottom"
      dangerIcon={<MaterialCommunityIcons name="close" color="#fff" />}
      successIcon={
        <MaterialCommunityIcons name="check" color="#fff" size={18} />
      }
      // Custom type example
      offset={10}
      renderType={{
        custom_toast: (toast) => (
          <View
            style={{
              height: 60,
              width: "80%",
              backgroundColor: "#fff",
              marginVertical: 4,
              borderRadius: 8,
              borderLeftColor: "green",
              borderLeftWidth: 8,
              justifyContent: "center",
              paddingLeft: 16,
            }}
          >
            <Text>{toast.message}</Text>
          </View>
        ),
      }}
    >
      <Home />
    </ToastProvider>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  test: {
    fontSize: 16,
    marginTop: 10,
  },
});
