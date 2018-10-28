import { userService } from '../_services/';
import { history } from '../_helpers';

export const userActions = {
    login,
    signup,
    logout
};

function login(username, password){
    return dispatch => {
        let apiEndpoint = 'auths/login';
        let payload = {
            username: username,
            password: password
        }
        userService.post(apiEndpoint, payload)
        .then((response)=>{
            console.log(response.data);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('auth', response.data.auth);
                dispatch(loginSuccess(response.data));
                history.push('/todo');
            }
        }).catch((err)=>{
            dispatch(loginFailure(err));
        })
    };
}
function signup(username, password){
    return dispatch => {
        let apiEndpoint = 'auths/signup';
        let payload = {
            username: username,
            password: password
        }
        userService.post(apiEndpoint, payload)
            .then((response)=>{
console.log(response);
                dispatch(createUserSuccess(response));
                history.push('/');
            }).catch((err)=>{
            console.log(err);
            dispatch(createUserFailure(err));
        });
    };
}
function logout(){
    return dispatch => {
        localStorage.removeItem('auth');
        localStorage.removeItem('token');
        dispatch(logoutUserSuccess());
        history.push('/');
    }
}

export function loginSuccess(user){
    return{
        type: "LOGIN_SUCCESS",
        auth: user.auth,
        token: user.token,
        message: user.message
    }
}
export function loginFailure(user){
    return{
        type: "LOGIN_FAILURE",
        auth: null,
        token: null,
        message: user.message
    }
}
export function createUserSuccess(user){
console.log(user)
    return{
        type: "SIGNUP_SUCCESS",
        message: user.message
    }
}
export function createUserFailure(err){
console.log(err);
    return{
        type: "SIGNUP_FAILURE",
        message: err.message==='Request failed with status code 409'?'User already Exists':err.message
    }
}
export function logoutUserSuccess(){
    return{
        type: "LOGOUT_SUCCESS",
        auth: false,
        token: ''
    }
}