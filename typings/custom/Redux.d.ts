import redux from 'redux';

export = Redux
export as namespace Redux;

declare namespace Redux {
  interface Store extends redux.Store {}
  interface Reducer extends redux.Reducer {}

  interface Action extends redux.Action {
    payload?: any
  }
}
