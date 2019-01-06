import { 
    CHANGE_NAME_VALUE,
    CHANGE_PASSWORD_VALUE
 } from './constants';

export const setNameField = (text) => ({
    type: CHANGE_NAME_VALUE,
    payload: text
})

export const setPasswordField = (text) => ({
    type: CHANGE_PASSWORD_VALUE,
    payload: text
})