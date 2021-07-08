import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";
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
      offset={10}
      // Custom type example

      renderType={{
        custom_toast: (toast) => (
          <View
            style={{
              maxWidth: "85%",
              paddingHorizontal: 15,
              paddingVertical: 10,
              backgroundColor: "#fff",
              marginVertical: 4,
              borderRadius: 8,
              borderLeftColor: "#00C851",
              borderLeftWidth: 6,
              justifyContent: "center",
              paddingLeft: 16,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "#333",
                fontWeight: "bold",
              }}
            >
              {toast.data.title}
            </Text>
            <Text style={{ color: "#a3a3a3", marginTop: 2 }}>
              {toast.message}
            </Text>
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
