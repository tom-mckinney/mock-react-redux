import React from "react";
import { Switch, SwitchProps, match, matchPath, RouteProps } from "react-router";
import { Location } from "history";

export interface MultiStepSwitchProps {
  currentStep?: number;
  location: Location;
}

class MultiStepSwitch extends React.Component<MultiStepSwitchProps> {
  render() {
    const { location, children } = this.props;
    // let location: Location;
    // if (typeof this.props.location !== "undefined") {
    //   location = this.props.location;
    // } else {
    //   const { route } = this.context.router;
    //   location = route.location as Location;
    // }

    let match: match<any> | null = null;
    let child: React.ReactElement<any>;
    React.Children.forEach(children, (element, i) => {
      if (match == null && React.isValidElement<RouteProps>(element)) {
        const {
          path: pathProp,
          exact,
          strict,
          // sensitive,
          // from
        } = element.props;
        const path = pathProp;
        // match = matchPath(
        //   location.pathname,
        //   { path, exact, strict }
        // );
        child = element;
        match = matchPath(
          location.pathname,
          { path, exact, strict }
        );
      }
    });

    return match
      ? React.cloneElement(child as React.ReactElement<any>, { location, computedMatch: match })
      : null;

    // return (
    //   <Switch>
    //     {children}
    //   </Switch>
    // );
  }
}

// const MultiStepSwitch: React.SFC<MultiStepSwitchProps> = ({ currentStep, children, context }) => {
//     const { route } = this.context.router;
//     const location = this.props.location || route.location;

//     let match: match<any> | null = null;
//     React.Children.forEach(children, (element, i) => {
//       if (match == null && React.isValidElement(element)) {

//       }
//     });
//   return (
//     <Switch>
//       {children}
//     </Switch>
//   );
// };

export default MultiStepSwitch;

// export default class MultiStepSwitch extends Component {
//   render() {
//     // const { route } = this.context.router;
//     // const { children } = this.props;
//     // const location = this.props.location || route.location;

//     // let match: match<any> | null = null;
//     // React.Children.forEach(children, (element, i) => {
//     //   if (match == null && React.isValidElement(element)) {

//     //   }
//     // });

//     return (
//       <Switch>
//         {this.props.children}
//       </Switch>
//     );
//   }
// }
