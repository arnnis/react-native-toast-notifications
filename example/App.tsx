import { StatusBar } from "expo-status-bar";
import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HookExample from "./hook-example";
import Toast, { ToastProvider } from "react-native-fast-toast";

export default function App() {
  const toastRef = useRef<Toast>(null);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    global["toast"] = toastRef.current as ToastType;
  }, []);

  return (
    <ToastProvider placement="bottom">
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Toast
          ref={toastRef}
          dangerIcon={<MaterialCommunityIcons name="close" color="#fff" />}
          successIcon={
            <MaterialCommunityIcons name="check" color="#fff" size={18} />
          }
          animationDuration={100}
          renderType={{
            success: (toast) => (
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
          // renderToast={(toast) => (
          //   <View
          //     style={{ height: 60, width: "100%", backgroundColor: "tomato" }}
          //   >
          //     <Text>{toast.message}</Text>
          //   </View>
          // )}
        />

        <Text
          onPress={() =>
            toastRef.current?.show("This is a toast!", { duration: 10000 })
          }
          style={styles.test}
        >
          Normal
        </Text>
        <Text
          onPress={() =>
            toastRef.current?.show("This is a success toast!", {
              type: "success",
              placement: "bottom",
            })
          }
          style={styles.test}
        >
          Success
        </Text>
        <Text
          onPress={() =>
            toastRef.current?.show("This is a danger toast!", {
              type: "danger",
            })
          }
          style={styles.test}
        >
          Danger
        </Text>
        <Text
          onPress={() =>
            toastRef.current?.show("This is a warning toast!", {
              type: "warning",
            })
          }
          style={styles.test}
        >
          Warning
        </Text>
        <Text
          onPress={() =>
            toastRef.current?.show("This is a styled toast!", {
              style: { padding: 2 },
              textStyle: { fontSize: 18 },
            })
          }
          style={[styles.test, { marginTop: 30 }]}
        >
          Styled
        </Text>
        <Text
          onPress={() => {
            toastRef.current?.show("Toast with custom Icon", {
              icon: (
                <MaterialCommunityIcons name="twitter" color="#fff" size={18} />
              ),
            });
          }}
          style={styles.test}
        >
          With Custom Icon
        </Text>
        <Text
          onPress={() => {
            toast?.show(<ActivityIndicator />);
          }}
          style={[styles.test]}
        >
          JSX for message
        </Text>

        <Text
          onPress={() => {
            let id = toastRef.current?.show("This toast will update", {});
            setTimeout(() => {
              if (id) {
                toastRef.current?.update(id, "Toast updated", {
                  type: "success",
                });
              }
            }, 1000);
          }}
          style={[styles.test, { marginTop: 30 }]}
        >
          Update a Toast
        </Text>

        <Text
          onPress={() => {
            toast?.show("Global toast call");
          }}
          style={[styles.test, { marginTop: 30 }]}
        >
          Global toast call
        </Text>

        <Text
          onPress={() => {
            toast?.show("Toast 1");
            toast?.show("Toast 2");
          }}
          style={[styles.test, { marginTop: 30 }]}
        >
          Two toast at same time
        </Text>

        <Text
          onPress={() => {
            toast?.show("Press to close", {
              duration: 10000,
              onPress: (id) => alert("hey"),
            });
          }}
          style={[styles.test, { marginTop: 30 }]}
        >
          Toast onPress & close on press
        </Text>
        <TextInput ref={inputRef} style={{ height: 50 }}></TextInput>
        <Text
          onPress={() => {
            inputRef.current?.focus();
            toast?.show("Hi!");
          }}
          style={[styles.test, { marginTop: 30 }]}
        >
          Toast avoids keyboard
        </Text>
        <HookExample />
      </View>
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
