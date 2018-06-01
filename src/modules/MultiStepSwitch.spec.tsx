import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router";
import { RouterAction, push } from "react-router-redux";
import { mount } from "enzyme";

import MultiStepSwitch from "./MultiStepSwitch";
import ConnectedRouterSpy, { ConnectedRouterSpyState } from "./ConnectedRouterSpy";

type NavigationProps = {
  navigate: (route: string) => RouterAction
};

type TestComponentProps = ConnectedRouterSpyState & NavigationProps;

const Step1: React.SFC<TestComponentProps> = ({ navigate }) => (
  <button type="button" onClick={() => navigate("/step-2")} />
);

const Step2: React.SFC<TestComponentProps> = ({ navigate }) => (
  <button type="button" onClick={() => navigate("/step-3")} />
);

const Step3: React.SFC<TestComponentProps> = ({ navigate }) => (
  <button type="button" onClick={() => navigate("/done")} />
);

const MultiSteps: React.SFC<TestComponentProps> = (props) => (
  <>
    <Route path="/step-1" render={() => <Step1 {...props} />} />
    <Route path="/step-2" render={() => <Step2 {...props} />} />
    <Route path="/step-3" render={() => <Step3 {...props} />} />
    <Route path="/done" render={() => <span>Job's done.</span>} />
  </>
);

const ConnectedMultiSteps = connect(
  (state: ConnectedRouterSpyState) => state,
  (dispatch) => ({
    navigate: (route: string) => dispatch(push(route))
  })
)(MultiSteps);

it("renders the first step", () => {
  const wrapper = mount(
    <ConnectedRouterSpy location="/step-1">
      <MultiStepSwitch>
        <ConnectedMultiSteps />
      </MultiStepSwitch>
    </ConnectedRouterSpy>
  );

  expect(wrapper.find(Step1)).toExist();
});
