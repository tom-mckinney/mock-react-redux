import * as React from 'react';

export default class MockProvider extends React.Component {
  render() {
    return React.Children.only(this.props.children);
  }
}
