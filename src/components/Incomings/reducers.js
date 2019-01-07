import {
    CHANGE_NAME_FIELD,
    CHANGE_VALUE_FIELD,
    CHANGE_RECURRENCE_FIELD,
    CHANGE_OCCUPANTION_FIELD,
    SET_MEMBERS_ARRAY,
    SET_TABLE_TOP,
    SET_TABLE_BOTTOM,
    SET_VALUETYPE,
    SET_VALUETYPE_BOTTOM
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
    tabletop: [],
    tablebottom: []
}

export const setTables = (state=initialStateTables, action={}) => {
    switch(action.type) {
        case SET_TABLE_TOP:
            return Object.assign({}, state, { tabletop: action.payload });
        case SET_TABLE_BOTTOM:
            return Object.assign({}, state, { tablebottom: action.payload });
        default:
            return state;
    }
}

const initialStateValueType = {
    valuetypetop: '',
    valuetypebottom: ''
}

const initialStateTableSetup = {
    valuetype: '' // summary - incomings - expenses
}

export const setValueType = (state=initialStateValueType, action={}) => {
    switch(action.type) {
        case SET_VALUETYPE:
            return Object.assign({}, state, { valuetypetop: action.payload });
        case SET_VALUETYPE_BOTTOM:
            return Object.assign({}, state, { valuetypebottom: action.payload });
        default:
            return state;
    }
}