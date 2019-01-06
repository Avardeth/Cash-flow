import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'tachyons';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import  thunkMiddleware  from 'redux-thunk';
import { valueChange } from './components/SignIn/reducers';
import { onRouteChange, loadUser } from './reducers'

const logger = createLogger();
const rootReducer = combineReducers({ valueChange, onRouteChange, loadUser });
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

serviceWorker.unregister();
