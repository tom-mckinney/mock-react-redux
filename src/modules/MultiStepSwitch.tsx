import React, { Component } from "react";
import { Switch, SwitchProps, match } from "react-router";

export interface MultiStepSwitchProps {
  furthestStep: number;
}

export default class MultiStepSwitch extends Component<MultiStepSwitchProps> {
  render() {
    // const { route } = this.context.router;
    const { children } = this.props;
    // const location = this.props.location || route.location;

    // let match: match<any> | null = null;
    // React.Children.forEach(children, (element, i) => {
    //   if (match == null && React.isValidElement(element)) {

    //   }
    // });

    return (
      <Switch>
        {children}
      </Switch>
    );
  }
}
