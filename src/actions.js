import {
    CHANGE_ROUTE,
    LOAD_USER_DATA
} from './constants';

export const onRouteChange = (text) => ({
    type: CHANGE_ROUTE,
    payload: text
})

export const loadUser = (object) => ({
    type: LOAD_USER_DATA,
    payload: object
})