import { 
    CHANGE_NAME_VALUE,
    CHANGE_PASSWORD_VALUE
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
