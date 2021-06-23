import { render } from "@testing-library/react";
import { AxiosRequestConfig } from "axios";
import { networkRequestType, reduxConfigType } from "./types";
import useAxiosWithRedux from "./useAxiosWithRedux";
import * as reactRedux from "react-redux";
import { Dispatch } from "redux";

const setup = (
  url: string,
  reduxOption: reduxConfigType,
  config?: AxiosRequestConfig
) => {
  const returnValue: networkRequestType<void, null> = [
    { data: null, error: null, isLoading: false },
    () => null,
    () => null,
    () => null,
    Promise.resolve(),
  ];

  function DummyComponent() {
    Object.assign(returnValue, useAxiosWithRedux(url, reduxOption, config));
    return null;
  }
  render(<DummyComponent />);
  return returnValue;
};

describe("useAxiosWithRedux", () => {
  it("should have correct initial state", () => {
    const dummyDispatch = jest.fn() as Dispatch;
    const dummySelector = jest.fn() as reactRedux.TypedUseSelectorHook<unknown>;

    const networkRequest = setup("url", {
      appDispatch: dummyDispatch,
      useSelector: dummySelector,
    });
    expect(networkRequest).not.toBeNull();
    expect(networkRequest[0].data).toBeNull();
    expect(networkRequest[0].error).toBeNull();
    expect(networkRequest[0].isLoading).toBeFalsy();
  });
});
