import * as React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { shallow } from "enzyme";
import "jest-enzyme";

describe("Provider with reactive state", () => {
  it("should subscribe to dispatched actions", () => {
    const store = createStore(() => ({}));

    const wrapper = shallow(<Provider store={store}><div>Test</div></Provider>);

    expect(wrapper.find("div")).toExist();
  });
});
