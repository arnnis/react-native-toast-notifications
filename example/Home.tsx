import { StatusBar } from "expo-status-bar";
import React, { useRef, useEffect } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

import { ToastProvider, useToast } from "react-native-toast-notifications";

const Home = () => {
  const toast = useToast();
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    global["toast"] = toast;
  }, []);

  return (
    <ToastProvider placement="bottom">
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text
          onPress={() => toast.show("This is a toast!", { duration: 10000 })}
          style={styles.test}
        >
          Normal
        </Text>
        <Text
          onPress={() =>
            toast.show("This is a success toast!", {
              type: "success",
            })
          }
          style={styles.test}
        >
          Success
        </Text>
        <Text
          onPress={() =>
            toast.show("This is a danger toast!", {
              type: "danger",
            })
          }
          style={styles.test}
        >
          Danger
        </Text>
        <Text
          onPress={() =>
            toast.show("This is a warning toast!", {
              type: "warning",
            })
          }
          style={styles.test}
        >
          Warning
        </Text>
        <Text
          onPress={() =>
            toast.show(
              "This is a customized toast! you can implement your own",
              {
                type: "custom_toast",
                animationDuration: 100,
                data: {
                  title: "Customized toast",
                },
              }
            )
          }
          style={styles.test}
        >
          Custom type
        </Text>
        <Text
          onPress={() =>
            toast.show("This is a customized toast with close button!", {
              type: "with_close_button",
              animationDuration: 100,
            })
          }
          style={styles.test}
        >
          Custom type 2
        </Text>
        <Text
          onPress={() => {
            toast.show("This toast should render on top", {
              placement: "top",
            });
          }}
          style={[styles.test, { marginTop: 30 }]}
        >
          Placement top
        </Text>
        <Text
          onPress={() => {
            toast?.show("This toast have zoom-in animation", {
              placement: "bottom",
              animationType: "zoom-in",
            });
          }}
          style={[styles.test]}
        >
          Zoom in animation type
        </Text>
        <Text
          onPress={() => {
            let id = toast.show("This toast will update", {});
            setTimeout(() => {
              if (id) {
                toast.update(id, "Toast updated", {
                  type: "success",
                });
              }
            }, 1000);
          }}
          style={styles.test}
        >
          Update a Toast
        </Text>

        <Text
          onPress={() => {
            toast.show("Global toast call");
          }}
          style={[styles.test]}
        >
          Global toast call
        </Text>

        <Text
          onPress={() => {
            toast.show("Toast 1");
            toast.show("Toast 2");
          }}
          style={[styles.test, { marginTop: 30 }]}
        >
          Two toast at same time
        </Text>

        <Text
          onPress={() => {
            toast.show("Press to close", {
              duration: 10000,
              onPress: (id) => {
                toast.hide(id);
              },
            });
          }}
          style={[styles.test, { marginBottom: 30 }]}
        >
          Toast onPress & close on press
        </Text>
        <TextInput
          ref={inputRef}
          style={{ height: 50 }}
          placeholder="Input"
        ></TextInput>
        <Text
          onPress={() => {
            inputRef.current?.focus();
            toast.show("Hi!");
          }}
          style={[styles.test]}
        >
          Toast avoids keyboard
        </Text>

        <Text
          onPress={() => {
            inputRef.current?.focus();
            toast.hideAll();
          }}
          style={[styles.test]}
        >
          Hide all open toasts
        </Text>
      </View>
    </ToastProvider>
  );
};
const styles = StyleSheet.create({
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

export default Home;
