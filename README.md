# use-axios-with-redux custom hook

## A react hook to aggregate axios network requests and functionalities with react redux

The purpose of this hook is to create a reusable flexible hook that can handle network requests and cancelation (using Axios) and storing the response (using react redux).

## Installation

You need to have axios installed in your project in your React Native project.

```js
    npm install axios
```

## Usage

First customize the hook by creating a custom hook **useNetworkRequest(.js/.ts)** in your project.
Then import the **useAxiosWithRedux** hook in the file:

```js
import useAxiosWithRedux from 'use-axios-with-redux';
```

For Typescript, you should also import networkRequestType like this:

```js
import { networkRequestType } from 'use-axios-with-redux/types';
```

Customize **useNetworkRequest** like this:

```ts
export const useNetworkRequest = <RequestDataType, ResponseDataType>(
    url: string,
    config?: AxiosRequestConfig,
    reduxConfig?: reduxConfigType,
): networkRequestType<RequestDataType, ResponseDataType> => {
    return useAxiosWithRedux<RequestDataType, ResponseDataType>(
        url,
        {
            ...(reduxConfig || {}),
            useSelector: useSelector, // Add a react redux selector hook
            appDispatch: useDispatch(), // Add a react redux dispatch object
        },
        config,
    );
};
```

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
