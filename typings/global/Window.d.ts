import redux from 'redux';

declare global {
  interface Window {
    devToolsExtension(): redux.StoreEnhancer<any>
  }
}

export { };
