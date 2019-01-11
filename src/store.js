import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import  thunkMiddleware  from 'redux-thunk';
import { valueChange, setAlert } from './components/SignIn/reducers';
import { onRouteChange, loadUser } from './reducers';
import {
    setValues, setMembers, setTables, setTableType, setRecurrence, setOccupant
} from './components/Incomings/reducers';

const logger = createLogger();
const rootReducer = combineReducers({ 
    valueChange,
    onRouteChange,
    loadUser,
    setAlert,
    setValues,
    setMembers,
    setTables,
    setTableType,
    setRecurrence,
    setOccupant
});
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));