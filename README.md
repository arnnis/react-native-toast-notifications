# react-native-fast-toast

A Toast components for react-native, supports Android, IOS, Web, Windows, no native dependency

## Features

- Normal, Success, Danger and Warning toasts
- Customizable and Icon support
- Smooth animation
- Fully typed with [TypeScript]

## Demo

![](https://user-images.githubusercontent.com/61647712/92497391-8864e900-f20e-11ea-93d8-bacc2b856583.gif)

## Install

Open a Terminal in the project root and run:

```sh
yarn add react-native-fast-toast
```

## Basic Example

```js
import React, { useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import Toast from "react-native-fast-toast";

export default function App() {
  const toast = useRef(null);

  useEffect(() => {
    toast.current.show("Task finished successfully");
  }, []);

  return (
    <>
      <RestOfYourApp />
      <Toast ref={toast} />
    </>
  );
}
```

## Type Example

```js
    toast.current.show('Task finished successfully', { type: 'success' })
}
```

## Icon Example

```js
    toast.current.show('Task finished successfully', { icon: <Icon /> })
}
```

or

```js
    <Toast
      ref={toast}
      icon={<Icon />}
      successIcon={<SuccessIcon />}
      dangerIcon={<DangerIcon />}
      warningIcon={<WarningIcon />}
    />
}
```

## Customize

```js
    toast.current.show('Task finished successfully', {
        duration: 5000,
        style: { padding: 0 },
        textStyle: { fontSize: 20 }
    })
}
```

You can customize default options in Toast component

```js
<Toast ref={toast} duration={5000} textStyle={{ fontSize: 20 }} />
```

## Contributing

Pull request are welcome.

While developing, you can run the [example app](/example) to test your changes.

```

```
