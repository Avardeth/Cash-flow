import {
    CHANGE_NAME_FIELD,
    CHANGE_VALUE_FIELD,
    CHANGE_RECURRENCE_FIELD,
    CHANGE_OCCUPANTION_FIELD,
    SET_MEMBERS_ARRAY,
    SET_TABLE,
    SET_TABLETYPE_SUMMARY,
    SET_TABLETYPE_INCOMINGS,
    SET_TABLETYPE_EXPENSES,
    SET_RECURRENCE,
    SET_OCCUPANT
} from './constants';

const initialState = {
    name: '',
    value: '',
    recur: '',
    occup: ''
}

export const setValues = (state=initialState, action={}) => {
    switch(action.type) {
        case CHANGE_NAME_FIELD:
            return Object.assign({}, state, { name: action.payload });
        case CHANGE_VALUE_FIELD:
            return Object.assign({}, state, { value: action.payload });
        case CHANGE_RECURRENCE_FIELD:
            return Object.assign({}, state, { recur: action.payload });
        case CHANGE_OCCUPANTION_FIELD:
            return Object.assign({}, state, { occup: action.payload });
        default:
            return state;
    }
}
const initialStateMembers = {
    members: []
}

export const setMembers = (state=initialStateMembers, action={}) => {
    switch(action.type) {
        case SET_MEMBERS_ARRAY:
            return Object.assign({}, state, { members: action.payload });
        default:
            return state;
    }
}

const initialStateTables = {
    table: null
}

export const setTables = (state=initialStateTables, action={}) => {
    switch(action.type) {
        case SET_TABLE:
            return Object.assign({}, state, { table: action.payload });
        default:
            return state;
    }
}

const initialStateTableSetup = {
    tabletype: 'summary',
    valuetype: [2, 4] // summary - incomings - expenses
}

export const setTableType = (state=initialStateTableSetup, action={}) => {
    switch(action.type) {
        case SET_TABLETYPE_SUMMARY:
            return Object.assign({}, state, { tabletype: 'summary', valuetype: [2, 4] });
        case SET_TABLETYPE_INCOMINGS:
            return Object.assign({}, state, { tabletype: 'incomings', valuetype: [1, 2] });
        case SET_TABLETYPE_EXPENSES:
            return Object.assign({}, state, { tabletype: 'expenses', valuetype: [3, 4] });
        default:
            return state;
    }
}

const initialStateRecurrence = {
    recurrence: []
}

export const setRecurrence = (state=initialStateRecurrence, action={}) => {
    switch(action.type) {
        case SET_RECURRENCE:
            return Object.assign({}, state, { recurrence: action.payload })
        default:
            return state;
    }
}

export const initialStateOccupant = {
    occupant: []
}

export const setOccupant = (state=initialStateOccupant, action={}) => {
    switch(action.type) {
        case SET_OCCUPANT:
            return Object.assign({}, state, { occupant: action.payload })
        default:
            return state;
    }
}