import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import authReducer from './Store/Reducers/auth';
import formResponseReducer from './Store/Reducers/formResponse';
import thunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';

const rootReducer = combineReducers({
  auth: authReducer,
  response: formResponseReducer
})

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);

const store = createStore(rootReducer, enhancer)

const app = (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
)
ReactDOM.render(app, document.getElementById('root'));

reportWebVitals();
