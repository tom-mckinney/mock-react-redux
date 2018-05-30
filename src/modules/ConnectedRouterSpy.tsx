import * as React from "react";
import { createStore, combineReducers, ReducersMapObject, Store, applyMiddleware, AnyAction } from "redux";
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
  store: Store<ConnectedRouterSpyState, AnyAction>;
  constructor(props: ConnectedRouterSpyProps) {
    super(props);

    this.history = createMemoryHistory({ initialEntries: [this.props.location || "/"] });
    this.store = createStore(combineReducers(reducers), applyMiddleware(routerMiddleware(this.history))) as Store<ConnectedRouterSpyState>;
  }
  render() {
    return (
      <Provider store={this.store}>
        <ConnectedRouter history={this.history}>
          {this.props.children}
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default ConnectedRouterSpy;
