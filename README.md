# react-native-fast-toast

[![Version][version-badge]][package]
[![MIT License][license-badge]][license]

A Toast component for react-native, supports Android, IOS, Web, Windows

## Features

- Normal, Success, Danger and Warning toasts
- Customizable and Icon support
- Smooth animation
- Fully typed with TypeScript

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
```

## Global Example

If you want to have one Toast and use it everywhere on your app. do this in root component of your app (index.js or App.js)

```js
import Toast from "react-native-fast-toast";

export default function App() {
  return (
    <>
      <RestOfYourApp />
      <Toast ref={(ref) => global['toast'] = ref} />
    </>
  );
```

now you can call `toast.show()` everywhere on app. like alert.

TypeScript Note: add [index.d.ts](/example/index.d.ts) to your project root.

## Hook Example
Alternatively you can use hooks to call toasts, to do so, wrap `ToastProvier` to your root component (index.js or App.js)
```js
import { ToastProvider } from 'react-native-fast-toast'

export default function App() {
  return (
    <ToastProvider>
      <RestOfYourApp />
    <ToastProvider/>
  );
}
```

Then use hook like this everywhere:
```js
import { useToast } from 'react-native-fast-toast'

const Component = () => {
  const toast = useToast()
}
```

## Type Example

```js
toast.show("Task finished successfully", { type: "success" });
```

## Icon Example

```js
toast.show("Task finished successfully", { icon: <Icon /> });
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
toast.show("Task finished successfully", {
  duration: 5000,
  style: { padding: 0 },
  textStyle: { fontSize: 20 },
});
```

You can customize default options in Toast component

```js
<Toast 
  duration={5000} 
  textStyle={{ fontSize: 20 }}
  successColor="green"
  dangerColor="red"
  warningColor="orange"
/>
```

## Placement

```js
<Toast
  placement="bottom | top" // default to bottom
  offset={50} // distance from bottom or top. ( default to 60 )
/>
```

## Donation
If this project helped you reduce time to develop, you can buy me a cup of coffee :)

<a href="https://www.buymeacoffee.com/arnnis" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-red.png" alt="Buy Me A Coffee" height="50" ></a>

## Contributing

Pull request are welcome.

While developing, you can run the [example app](/example) to test your changes.


## License
MIT

[version-badge]: https://img.shields.io/npm/v/react-native-fast-toast.svg?style=flat-square
[package]: https://www.npmjs.com/package/react-native-fast-toast
[license-badge]: https://img.shields.io/static/v1?label=License&message=MIT&color=success&style=flat-square
[license]: https://github.com/arnnis/react-native-fast-toast/blob/master/LICENSE
