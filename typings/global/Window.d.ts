import redux from 'redux';


export = window

declare global {
  interface Window {
    devToolsExtension(): redux.StoreEnhancer<any>
  }
}

export { };
