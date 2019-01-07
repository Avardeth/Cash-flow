import { 
    CHANGE_NAME_VALUE,
    CHANGE_PASSWORD_VALUE,
    GIVE_ALERT_WARNING
} from './constants';
import url from '../url';
import { store } from '../../store';
import { loadUser, onRouteChange } from '../../actions';

export const setUsernameField = (text) => ({
    type: CHANGE_NAME_VALUE,
    payload: text
})

export const setPasswordField = (text) => ({
    type: CHANGE_PASSWORD_VALUE,
    payload: text
})

const setAlert = (alert) => ({
    type: GIVE_ALERT_WARNING,
    payload: alert
})

export const onSubmitSignIn = () => (dispatch) => {
    return fetch(`${url}/cashflow/signin`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          username: store.getState().valueChange.username,
          password: store.getState().valueChange.password
        })
    })
        .then(response => response.json())
        .then(user => user.id ? (dispatch(loadUser(user)), dispatch(onRouteChange('summary'))) : dispatch(setAlert(user)))
        .catch(err => dispatch(setAlert('Server is down')))
}