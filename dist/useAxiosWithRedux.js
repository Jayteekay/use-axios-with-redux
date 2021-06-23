"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var react_1 = require("react");
var CancelToken = axios_1.default.CancelToken;
var source = CancelToken.source();
var axiosInstance = axios_1.default.create({
    cancelToken: source.token,
});
var useAxiosWithRedux = function (url, reduxConfig, config) {
    var appDispatch = reduxConfig.appDispatch;
    var reduxAction = reduxConfig === null || reduxConfig === void 0 ? void 0 : reduxConfig.action;
    var reduxCallback = reduxConfig === null || reduxConfig === void 0 ? void 0 : reduxConfig.callback;
    var shouldStoreResponse = !!reduxAction;
    var shouldReturnStoredResponse = !!reduxCallback;
    var _a = react_1.useState(null), data = _a[0], setData = _a[1];
    var _b = react_1.useState(null), error = _b[0], setError = _b[1];
    var _c = react_1.useState(false), isLoading = _c[0], setIsLoading = _c[1];
    var _d = react_1.useState(null), dataPromise = _d[0], setDataPromise = _d[1];
    var storedResponse = reduxConfig.useSelector(reduxCallback || (function () { return null; }));
    if (shouldReturnStoredResponse) {
        setData(storedResponse);
    }
    var reset = function () {
        setData(null);
        setError(null);
        setIsLoading(false);
        setDataPromise(null);
    };
    var dispatch = function (body, params) {
        setIsLoading(true);
        var requestConfig = __assign(__assign({ url: url }, config), { data: (config === null || config === void 0 ? void 0 : config.data) ? Object.assign(config === null || config === void 0 ? void 0 : config.data, body) : body, params: params });
        var request = axiosInstance(requestConfig)
            .then(function (response) {
            reset();
            setData(response.data);
            if (shouldStoreResponse) {
                appDispatch({ type: reduxAction, payload: response.data });
            }
        })
            .catch(function (error) {
            reset();
            setError(error);
        });
        setDataPromise(request);
    };
    var cancel = function () {
        source.cancel('Operation cancelled by the user.');
    };
    return [{ data: data, error: error, isLoading: isLoading }, dispatch, reset, cancel, dataPromise];
};
exports.default = useAxiosWithRedux;
