import { 
    CHANGE_NAME_VALUE,
    CHANGE_PASSWORD_VALUE,
    GIVE_ALERT_WARNING
 } from './constants';

const initialState = {
    username: '',
    password: ''
}

export const valueChange = (state=initialState, action={}) => {
    switch (action.type) {
        case CHANGE_NAME_VALUE:
            return Object.assign({}, state, {username: action.payload})
        case CHANGE_PASSWORD_VALUE:
            return Object.assign({}, state, {password: action.payload})
        default:
            return state;
    }
}

const initialStateAlert = {
    alert: ''
}

export const setAlert = (state=initialStateAlert, action={}) => {
    switch(action.type) {
        case GIVE_ALERT_WARNING:
            return Object.assign({}, state, {alert: action.payload})
        default:
            return state
    }
}