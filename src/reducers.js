import {
    CHANGE_ROUTE, LOAD_USER_DATA
} from './constants';

const initialState = {
    route: 'signin',
    user: {}
}

export const onRouteChange = (state=initialState, action={}) => {
    switch(action.type) {
        case CHANGE_ROUTE:
            return Object.assign({}, state, {route: action.payload});
        
        default:
            return state;
    }
}

export const loadUser = (state=initialState, action={}) => {
    switch(action.type) {
        case LOAD_USER_DATA:
            return Object.assign({}, state, {user: action.payload});
        default:
            return state;
    }
}