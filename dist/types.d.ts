import { AxiosError } from "axios";
import { TypedUseSelectorHook } from "react-redux";
import { Dispatch } from "redux";
export declare type ReduxConfigType = {
    action?: string;
    callback?: (state: unknown) => any;
    appDispatch: Dispatch;
    useSelector: TypedUseSelectorHook<unknown>;
};
export declare type RequestState<ResponseDataType> = {
    data: ResponseDataType | null;
    error: AxiosError | null;
    isLoading: boolean;
};
export declare type NetworkRequestType<RequestDataType, ResponseDataType> = [
    RequestState<ResponseDataType>,
    (body?: RequestDataType, params?: RequestDataType) => void,
    () => void,
    () => void,
    Promise<void> | null
];
