import redux from 'redux';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__(): redux.StoreEnhancer<any>
  }
}

export { };
