import * as React from "react";
import { createStore, combineReducers, ReducersMapObject, Store, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { routerReducer, RouterState, ConnectedRouter, routerMiddleware } from "react-router-redux";
import { createMemoryHistory } from "history";

export interface JestReduxRouterProps {
  location?: string;
}

export interface JestReduxRouterState {
  router: RouterState;
}

class JestReduxRouter extends  React.Component<JestReduxRouterProps> {
  componentDidMount() {
    const history = createMemoryHistory({ initialEntries: [this.props.location || "/"] });
  }
}

const OldJestReduxRouter: React.SFC<JestReduxRouterProps> = ({ location = "/", children }) => {
  const reducers: ReducersMapObject = {
    router: routerReducer,
    test: (state = {}, action) => {
      switch (action.type) {
        default:
          // console.log(action);
          return state;
      }
    }
  };
  const history = createMemoryHistory();
  history.replace(location);
  // const initialState = { router: { location: { pathname: "/foo" } } };
  const store = createStore(combineReducers(reducers), applyMiddleware(routerMiddleware(history))) as Store<JestReduxRouterState>;
  const routerLocation = store.getState().router.location;
  console.log(routerLocation);
  if (routerLocation != null) {
    location = routerLocation.pathname;
  }
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {children}
      </ConnectedRouter>
    </Provider>
  );
};

export default JestReduxRouter;
