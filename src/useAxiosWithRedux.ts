import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useState } from 'react';
import { NetworkRequestType, ReduxConfigType } from './types';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const axiosInstance = axios.create({
    cancelToken: source.token,
});

const useAxiosWithRedux = <RequestDataType, ResponseDataType>(
    url: string,
    reduxConfig: ReduxConfigType,
    config?: AxiosRequestConfig,
): NetworkRequestType<RequestDataType, ResponseDataType> => {
    const appDispatch = reduxConfig.appDispatch;

    const reduxAction = reduxConfig?.action;
    const reduxCallback = reduxConfig?.callback;
    const shouldStoreResponse = !!reduxAction;
    const shouldReturnStoredResponse = !!reduxCallback;

    const [data, setData] = useState<ResponseDataType | null>(null);
    const [error, setError] = useState<AxiosError | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [dataPromise, setDataPromise] = useState<Promise<void> | null>(null);

    const storedResponse = reduxConfig.useSelector<ResponseDataType | void>(reduxCallback || (() => null));
    if (shouldReturnStoredResponse) {
        setData(storedResponse as ResponseDataType);
    }

    const reset = (): void => {
        setData(null);
        setError(null);
        setIsLoading(false);
        setDataPromise(null);
    };

    const dispatch = (body?: RequestDataType, params?: RequestDataType) => {
        setIsLoading(true);
        const requestConfig = {
            url,
            ...config,
            data: config?.data ? Object.assign(config?.data, body) : body,
            params,
        };
        const request = axiosInstance(requestConfig)
            .then((response: AxiosResponse) => {
                reset();
                setData(response.data);
                if (shouldStoreResponse) {
                    appDispatch({ type: reduxAction, payload: response.data });
                }
            })
            .catch((error: AxiosError) => {
                reset();
                setError(error);
            });
        setDataPromise(request);
    };

    const cancel = () => {
        source.cancel('Operation cancelled by the user.');
    };

    return [{ data, error, isLoading }, dispatch, reset, cancel, dataPromise];
};
export default useAxiosWithRedux;
