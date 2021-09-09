# react-native-toast-notifications

[![Version][version-badge]][package]
[![MIT License][license-badge]][license]

Toast component for React Native, supports Android, IOS and Web

## Features

- Fully Customizable
- Swipe to close support
- Smooth animation
- Fully typed with TypeScript

## Demo

![](https://user-images.githubusercontent.com/61647712/124135853-72742d80-da99-11eb-95f8-893281862e96.gif)

[react-native-web Demo](https://arnnis.github.io/react-native-toast-notifications/)

## Install

Open a Terminal in the project root and run:

```sh
yarn add react-native-toast-notifications
```

## Usage

Wrap your app in the `ToastProvider`, which provides context for the Toast hook.

```js
import { ToastProvider } from 'react-native-toast-notifications'

export default function App() {
  return (
    <ToastProvider>
      <RestOfYourApp />
    <ToastProvider/>
  );
}
```

Then use hook like this everywhere in your app:

```js
import { useToast } from "react-native-toast-notifications";

const Component = () => {
  const toast = useToast();

  useEffect(() => {
    toast.show("Hello World");
  }, []);
};
```

## Methods

### show()

```js
toast.show("Task finished successfully", {
  type: "normal | success | warning | danger | custom",
  placement: "top | bottom",
  duration: 4000,
  offset: 30,
  animationType: "slide-in | zoom-in",
});
```

### update()

```js
let id = toast.show("Loading...");
toast.update(id, "Loading completed", {type: "success"});
```

### hide()

```js
let id = toast.show("Loading...");
toast.hide(id);
// or
toast.hideAll();
```

## Customization

### `ToastProvider` props

There are lots of props to customize your toast or your can use renderToast to implement your own component.

```js
<ToastProvider
    placement="bottom | top"
    duration={5000}
    animationType='slide-in | zoom-in'
    animationDuration={250}
    successColor="green"
    dangerColor="red"
    dangerColor="red"
    warningColor="orange"
    normalColor="gray"
    icon={<Icon />}
    successIcon={<SuccessIcon />}
    dangerIcon={<DangerIcon />}
    warningIcon={<WarningIcon />}
    textStyle={{ fontSize: 20 }}
    offset={50} // offset for both top and bottom toasts
    offsetTop={30}
    offsetBottom={40}
    swipeEnabled={true}
    renderToast={(toastOptions) => JSX.Element} implement custom toast component.
>
...
</>
```

### Custom toast types

You can implement your own custom types or overwrite the existing ones

```js
<ToastProvider
    renderType={{
      custom_type: (toast) => (
        <View style={{padding: 15, backgroundColor: 'grey'}}>
          <Text>{toast.message}</Text>
        </View>
      )
    }}
>
...
</>

// You can pass other data to your custom toast using data property in show method.
toast.show("Show custom toast", {data: { title: 'Toast title' }})
```

## FAQ

### - How to call toast outside React components?

To call toasts everywhere (even outside of React components like in redux actions), do this in root component of your app (index.js or App.js)

```js
import Toast from "react-native-toast-notifications";

export default function App() {
  return (
    <>
      <RestOfYourApp />
      <Toast ref={(ref) => global['toast'] = ref} />
    </>
  );
```

Now you can call `toast.show()` everywhere on app. similar to `alert`.

TypeScript Note: add [index.d.ts](/example/index.d.ts) to your project root.

### - How to show toast inside a Modal?

The Modal component is a native view that sits on top of the rest of react-native application. The only way to put something above it is to put something in the modal itself, or alternately to use a JS only implementation of a Modal.

As a workaround you can put toast inside modal like this:

```
import Toast from "react-native-toast-notifications";

export Component = () => {
    const toastRef = useRef();
    return (
        <Modal>
            .....
            <Toast ref={toastRef} />
        </Modal>

}
```

## Contributing

Pull request are welcome.

While developing, you can run the [example app](/example) to test your changes.

## Donation

If this project helped you reduce time to develop, you can buy me a cup of coffee :)

<a href="https://www.buymeacoffee.com/arnnis" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-red.png" alt="Buy Me A Coffee" height="50" ></a>

## Hire

Looking for a React/React-Native Expert? Email at alirezarzna@gmail.com

## License

MIT

[version-badge]: https://img.shields.io/npm/v/react-native-toast-notifications.svg?style=flat-square
[package]: https://www.npmjs.com/package/react-native-toast-notifications
[license-badge]: https://img.shields.io/static/v1?label=License&message=MIT&color=success&style=flat-square
[license]: https://github.com/arnnis/react-native-toast-notifications/blob/master/LICENSE
