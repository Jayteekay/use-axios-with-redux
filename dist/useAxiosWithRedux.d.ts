import { AxiosRequestConfig } from "axios";
import { NetworkRequestType, ReduxConfigType } from "./types";
declare const useAxiosWithRedux: <RequestDataType, ResponseDataType>(url: string, reduxConfig: ReduxConfigType, config?: AxiosRequestConfig<any> | undefined) => NetworkRequestType<RequestDataType, ResponseDataType>;
export declare const axiosInstance: import("axios").AxiosInstance;
export default useAxiosWithRedux;
