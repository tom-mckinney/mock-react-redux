import * as React from "react";

export default class MockProvider extends React.Component {
  public render() {
    return React.Children.only(this.props.children);
  }
}
