import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import  thunkMiddleware  from 'redux-thunk';
import { valueChange, setAlert } from './components/SignIn/reducers';
import { onRouteChange, loadUser } from './reducers';
import { setValues, setMembers, setTables, setValueType } from './components/Incomings/reducers';

const logger = createLogger();
const rootReducer = combineReducers({ 
    valueChange,
    onRouteChange,
    loadUser,
    setAlert,
    setValues,
    setMembers,
    setTables,
    setValueType
});
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));