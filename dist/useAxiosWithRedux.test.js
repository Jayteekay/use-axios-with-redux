"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@testing-library/react");
var useAxiosWithRedux_1 = __importDefault(require("./useAxiosWithRedux"));
var setup = function (url, reduxOption, config) {
    var returnValue = [
        { data: null, error: null, isLoading: false },
        function () { return null; },
        function () { return null; },
        function () { return null; },
        Promise.resolve(),
    ];
    function DummyComponent() {
        Object.assign(returnValue, useAxiosWithRedux_1.default(url, reduxOption, config));
        return null;
    }
    react_1.render(jsx_runtime_1.jsx(DummyComponent, {}, void 0));
    return returnValue;
};
describe("useAxiosWithRedux", function () {
    it("should have correct initial state", function () {
        var dummyDispatch = jest.fn();
        var dummySelector = jest.fn();
        var networkRequest = setup("url", {
            appDispatch: dummyDispatch,
            useSelector: dummySelector,
        });
        expect(networkRequest).not.toBeNull();
        expect(networkRequest[0].data).toBeNull();
        expect(networkRequest[0].error).toBeNull();
        expect(networkRequest[0].isLoading).toBeFalsy();
    });
});
