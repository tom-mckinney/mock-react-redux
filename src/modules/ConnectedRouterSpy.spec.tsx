import * as React from "react";
import { connect } from "react-redux";
import { Switch, Route, Router } from "react-router";
import { push, RouterAction, ConnectedRouter } from "react-router-redux";
import { mount } from "enzyme";

import ConnectedRouterSpy, { ConnectedRouterSpyState } from "./ConnectedRouterSpy";

const Foo: React.SFC<TestComponentProps> = ({ navigate }) => (
  <div>
    <h1>Foo</h1>
    <button onClick={() => navigate("/bar")}>Go to Bar</button>
  </div>
);

const Bar: React.SFC<TestComponentProps> = ({ navigate }) => (
  <div>
    <h1>Bar</h1>
    <button onClick={() => navigate("/foo")}>Go to Foo</button>
  </div>
);

const TestComponent: React.SFC<TestComponentProps> = (props) => (
  <Switch>
    <Route path="/foo" render={() => <Foo {...props} />} />
    <Route path="/bar" render={() => <Bar {...props} />} />
  </Switch>
);

type NavigationProps = {
  navigate: (route: string) => RouterAction
};

type TestComponentProps = ConnectedRouterSpyState & NavigationProps;

const ConnectedTestComponent = connect(
  (state: ConnectedRouterSpyState) => state,
  (dispatch) => ({
    navigate: (route: string) => dispatch(push(route))
  })
)(TestComponent);

it("navigates to another location when the push action is dispatched", () => {
  const wrapper = mount(<ConnectedRouterSpy location="/foo"><ConnectedTestComponent /></ConnectedRouterSpy>);

  expect(wrapper.find(Foo)).toExist();

  wrapper.find("button").simulate("click");

  expect(wrapper.find(Bar)).toExist();
});
