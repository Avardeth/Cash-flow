import {
    CHANGE_NAME_FIELD,
    CHANGE_VALUE_FIELD,
    CHANGE_RECURRENCE_FIELD,
    CHANGE_OCCUPANTION_FIELD,
    SET_MEMBERS_ARRAY,
    SET_VALUETYPE,
    SET_TABLE_TOP,
    SET_TABLE_BOTTOM
} from './constants';
import url from '../url';
import { store } from '../../store';

// new data
export const setNameField = (text) => ({
    type: CHANGE_NAME_FIELD,
    payload: text
})

export const setValueField = (number) => ({
    type: CHANGE_VALUE_FIELD,
    payload: number
})

export const setRecurrenceField = (text) => ({
    type: CHANGE_RECURRENCE_FIELD,
    payload: text
})

export const setOccupantField = (text) => ({
    type: CHANGE_OCCUPANTION_FIELD,
    payload: text
})
//------------------------------------------//

// members for the mainpage
const setMembers = (array) => ({
    type: SET_MEMBERS_ARRAY,
    payload: array
})

export const fetchMembers = () => (dispatch) => {
    const { household } = store.getState().loadUser.user;

    return fetch(`${url}/cashflow/members/${household}`)
      .then(response => response.json())
      .then(obj => {
        const array = Array.from(obj.map((user, i) => obj[i].fullname))
        array.unshift('Summary')
        return array
      })
      .then(users => dispatch(setMembers(users)))    
}
//------------------------------------------//

// get tables
export const setValueType = (object) => ({
    type: SET_VALUETYPE,
    payload: object
})

export const setTableTop = (object) => ({
    type: SET_TABLE_TOP,
    payload: object
})

export const setTableBottom = (object) => ({
    type: SET_TABLE_BOTTOM,
    payload: object
})

export const fetchTables = () => (dispatch) => {
    const { valuetypetop } = store.getState().setValueType;
    const { household } = store.getState().loadUser.user;
    return fetch(`${url}/cashflow/${household}/${valuetypetop}`)
      .then(response => response.json())
      .then(data => dispatch(setTableTop(data)))
}
//------------------------------------------//