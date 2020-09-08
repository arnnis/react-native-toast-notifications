import { StatusBar } from "expo-status-bar";
import React, { useRef, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Toast from "react-native-fast-toast";

export default function App() {
  const toastRef = useRef<Toast>(null);

  useEffect(() => {
    // let id = toastRef.current?.show("This is a warning", {
    //   duration: 6000,
    //   type: "warning",
    // });
    // setTimeout(() => {
    //   if (id) {
    //     toastRef.current?.update(id, "This is not a warning", {
    //       type: "danger",
    //     });
    //   }
    // }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text>Open up App.tsx to start working on your app!</Text> */}
      <StatusBar style="auto" />
      <Toast
        ref={toastRef}
        dangerIcon={<MaterialCommunityIcons name="close" color="#fff" />}
        successIcon={
          <MaterialCommunityIcons name="check" color="#fff" size={18} />
        }
      />

      <Text
        onPress={() => toastRef.current?.show("This is a toast!")}
        style={styles.test}
      >
        Normal
      </Text>
      <Text
        onPress={() =>
          toastRef.current?.show("This is a success toast!", {
            type: "success",
          })
        }
        style={styles.test}
      >
        Success
      </Text>
      <Text
        onPress={() =>
          toastRef.current?.show("This is a danger toast!", { type: "danger" })
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
    </View>
  );
}

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
