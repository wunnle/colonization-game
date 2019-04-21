import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import TestTile from './components/TestTile'
import { Provider } from 'react-redux'
import store from './store'
import * as serviceWorker from './serviceWorker';

const AppWithStore = () => (
  <Provider store={store}>
      <App />
  </Provider>
)


const rootElement = document.getElementById("root");

render(<AppWithStore/>, rootElement)
//render(<TestTile/>, rootElement)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
