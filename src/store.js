import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';


const initialState = {};
const enhancers = [];
const middleware = [thunk];


if (process.env.NODE_ENV === 'development') {
  const devToolsExtension =  window.__REDUX_DEVTOOLS_EXTENSION__


  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

// TODO: work on 
// const customMiddleware = store => next => action => {
//   console.log("Middleware triggered:", action);
//   next(action);
// }

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const preloadedState = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__;

const store =  createStore(rootReducer(), preloadedState || initialState, composedEnhancers);

window.snapSaveState = () => ({
  __PRELOADED_STATE__: store.getState()
});

export default store