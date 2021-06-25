# use-axios-with-redux custom hook

### A react hook to aggregate axios network requests and functionalities with react redux

The purpose of this hook is to create a reusable flexible hook that can handle network requests and cancelation (using Axios) and storing the response (using react redux).

## Installation

```
    npm install @types/axios use-axios-with-redux
```

## Usage

### Customizing the hook

The first step is to customize the hook to work with your project redux setup.

After setting up redux store by following the [guide on react-redux documentation](https://react-redux.js.org/introduction/getting-started), create a new hook **useNetworkRequest** in your project.

Then import the use-axios-with-redux hook in the custom hook:

```js
import useAxiosWithRedux from "use-axios-with-redux";
```

#### (Typescript only)

Import type for typescript:

```js
import { NetworkRequestType } from "use-axios-with-redux";
```

Add the following lines of code to your file:

#### Typescript:

```ts
export const useNetworkRequest = <RequestDataType, ResponseDataType>(
  url: string,
  config?: AxiosRequestConfig,
  reduxConfig?: ReduxConfigType
): NetworkRequestType<RequestDataType, ResponseDataType> => {
  return useAxiosWithRedux<RequestDataType, ResponseDataType>(
    url,
    {
      ...(reduxConfig || {}),
      useSelector: useSelector, // Add a react redux selector hook
      appDispatch: useDispatch(), // Add a react redux dispatch object
    },
    config
  );
};
```

#### Javascript

```ts
export const useNetworkRequest = (url, config, reduxConfig) => {
  return useAxiosWithRedux(
    url,
    {
      ...(reduxConfig || {}),
      useSelector: useSelector, // Add a react redux selector hook
      appDispatch: useDispatch(), // Add a react redux dispatch object
    },
    config
  );
};
```

You are all set.

To use this custom hook, call the function with the following:

```js
url // Url endpoint (equivalent to url parameter in axios)
config // equivalent to axios config object
reduxConfig = {
    action //redux action
    callback //callback that you would normally supply to useSelector hook eg state=>state.auth
}
```

The returns an array with the following stucture:

```js
[
  {
    data, // Network response or current redux state
    error, // Axios response
    isLoading, // Request loading state (true/false)
  },
  dispatch, // A function to perform the network request
  reset, // Set data = null, error=null, isLoading: false
  cancel, // Cancel a request
  dataPromise, // Axios promise for the request
];
```

## Example

```tsx

...

const [{ data: response, isLoading, error }, sendRequest, cancel, promise] =
  useNetworkRequest<RequestType, ResponseType>(
    "https://www.google.com",
    { method: "POST" },
    { action: REDUX_ACTION_TYPE, callback: (state) => state.google }
  );

  ...
return (
    <>
        <p>{response}</p>
        <button onClick={sendRequest}>Click me</button>
    </>
...
)
```
