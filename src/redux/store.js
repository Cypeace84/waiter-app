import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import initialState from './initialState';
import loadingReducer from './loadingRedux';
import tablesReducer from './tableRedux';

const subreducers = {
  tables: tablesReducer,
  isLoading: loadingReducer,
};

const reducer = combineReducers(subreducers);
const store = createStore(
  reducer,
  initialState,

  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

export default store;
