import { AxiosRequestConfig } from 'axios';
import { networkRequestType, reduxConfigType } from './types';
declare const useAxiosWithRedux: <RequestDataType, ResponseDataType>(url: string, reduxConfig: reduxConfigType, config?: AxiosRequestConfig | undefined) => networkRequestType<RequestDataType, ResponseDataType>;
export default useAxiosWithRedux;
