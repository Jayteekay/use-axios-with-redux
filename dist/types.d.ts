import { AxiosError } from 'axios';
import { TypedUseSelectorHook } from 'react-redux';
import { Dispatch } from 'redux';
export declare type reduxConfigType = {
    action?: string;
    callback?: () => void;
    appDispatch: Dispatch;
    useSelector: TypedUseSelectorHook<unknown>;
};
export declare type requestState<ResponseDataType> = {
    data: ResponseDataType | null;
    error: AxiosError | null;
    isLoading: boolean;
};
export declare type networkRequestType<RequestDataType, ResponseDataType> = [
    requestState<ResponseDataType>,
    (body?: RequestDataType, params?: RequestDataType) => void,
    () => void,
    () => void,
    Promise<void> | null
];
