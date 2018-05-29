import * as React from "react";
import { createStore, combineReducers, ReducersMapObject, Store, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { routerReducer, RouterState, ConnectedRouter, routerMiddleware } from "react-router-redux";
import { createMemoryHistory, MemoryHistory } from "history";

export interface ConnectedRouterSpyProps {
  location?: string;
}

export interface ConnectedRouterSpyState {
  router: RouterState;
}

const reducers: ReducersMapObject = {
  router: routerReducer
};

class ConnectedRouterSpy extends  React.Component<ConnectedRouterSpyProps> {
  history: MemoryHistory;
  constructor(props: ConnectedRouterSpyProps) {
    super(props);

    this.history = createMemoryHistory({ initialEntries: [this.props.location || "/"] });
  }
  render() {
    const history = createStore(combineReducers(reducers), applyMiddleware(routerMiddleware(this.history))) as Store<ConnectedRouterSpyState>;
    return (
      <Provider store={history}>
        <ConnectedRouter history={this.history}>
          {this.props.children}
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default ConnectedRouterSpy;
