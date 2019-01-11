import {
    CHANGE_NAME_FIELD,
    CHANGE_VALUE_FIELD,
    CHANGE_RECURRENCE_FIELD,
    CHANGE_OCCUPANTION_FIELD,
    SET_MEMBERS_ARRAY,
    SET_VALUETYPE,
    SET_TABLE,
    SET_RECURRENCE,
    SET_OCCUPANT
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

export const setTable = (object) => ({
    type: SET_TABLE,
    payload: object
})

export const setTableType = (text) => ({
    type: 'SET_TABLETYPE',
    payload: text
})

export const fetchTables = () => (dispatch) => {
    const { valuetype } = store.getState().setTableType;
    const { household } = store.getState().loadUser.user;

    return Promise.all([
        fetch(`${url}/cashflow/${household}/${valuetype[0]}`)
            .then(response => response.json()),
        fetch(`${url}/cashflow/${household}/${valuetype[1]}`)
            .then(response => response.json())

    ])
        .then(data => dispatch(setTable(data)))
    
}
//------------------------------------------//

// update table
export const updateTable = () => (dispatch) => {
    return fetch(`${url}/cashflow/updatetable`, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: store.getState().setValues.name,
          value: store.getState().setValues.value,
          recurrence: store.getState().setValues.recur,
          occupant: store.getState().setValues.occup,
          household: store.getState().loadUser.user.household,
          valuetype: store.getState().setTableType.valuetype[0]
        })
      })
        .then(response => response.json())
        .then(() => {
            dispatch(setNameField(""))
            dispatch(setValueField(""))
            dispatch(setRecurrenceField("Select"))
            dispatch(setOccupantField("Select"))
            dispatch(fetchTables())
        })
}
//------------------------------------------//

// recurrance and members
export const setRecurrence = (array) => ({
    type: SET_RECURRENCE,
    payload: array
})

export const fetchRecurrence = () => (dispatch) => {
    return fetch(`${url}/cashflow/recur`)
      .then(response => response.json())
      .then(obj => Array.from(obj.map((user, i) => obj[i].name)))
      .then(names => dispatch(setRecurrence(names)))
}

export const setOccupant = (array) => ({
    type: SET_OCCUPANT,
    payload: array
})

export const fetchOccupant = () => (dispatch) => {
    const { household } = store.getState().loadUser.user;
    return fetch(`${url}/cashflow/members/${household}`)
        .then(response => response.json())
        .then(obj => Array.from(obj.map((user, i) => obj[i].fullname)))
        .then(users => dispatch(setOccupant(users)))
}
//------------------------------------------//