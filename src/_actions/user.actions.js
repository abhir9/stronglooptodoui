import {userService} from '../_services/';
import {history} from '../_helpers';

export const userActions = {
  login,
  signup,
  logout
};

function login(email, password) {
  return dispatch => {
    let apiEndpoint = '/appusers/login';
    let payload = {
      email: email,
      password: password
    }
    userService.post(apiEndpoint, payload)
        .then((response) => {
          if (response.data.id) {
            localStorage.setItem('token', response.data.id);
            dispatch(loginSuccess(response.data));
            history.push('/todo');
          }
        }).catch((err) => {
      dispatch(loginFailure(err));
    })
  };
}

function signup(email, password) {
  return dispatch => {
    let apiEndpoint = '/appusers';
    let payload = {
      email: email,
      password: password
    }
    userService.post(apiEndpoint, payload)
        .then((response) => {
          dispatch(createUserSuccess(response));
          history.push('/');
        }).catch((err) => {
      dispatch(createUserFailure(err));
    });
  };
}

function logout() {
  return dispatch => {
    let apiEndpoint = '/appusers/logout';
    let payload = {
      accessToken: localStorage.getItem('token')
    }
    userService.post(apiEndpoint, payload)
        .then((response) => {
          localStorage.removeItem('token');
          dispatch(logoutUserSuccess());
          history.push('/');
        }).catch((err) => {
      dispatch(loginFailure(err));
    })
  }
}

export function loginSuccess(user) {
  return {
    type: "LOGIN_SUCCESS",
    token: user.token,
    message: user.message
  }
}

export function loginFailure(user) {
  return {
    type: "LOGIN_FAILURE",
    token: null,
    message: user.message.indexOf('Request failed with status code 4') > -1 ? 'Login Failed, Please Try Again' : user.message
  }
}

export function createUserSuccess(user) {
  return {
    type: "SIGNUP_SUCCESS",
    message: user.message
  }
}

export function createUserFailure(err) {
  return {
    type: "SIGNUP_FAILURE",
    message: err.message.indexOf('Request failed with status code 4') > -1 ? 'User already Exists' : err.message
  }
}

export function logoutUserSuccess() {
  return {
    type: "LOGOUT_SUCCESS",
    token: ''
  }
}