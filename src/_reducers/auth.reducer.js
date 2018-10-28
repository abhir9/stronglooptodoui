
let token = '';//localStorage.getItem('token');
let auth = '';//localStorage.getItem('auth');
const initialState = auth ? { loggedIn: true, auth, token } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        loggingIn: true,
        auth: action.auth,
        token: action.token,
          message:action.message
      };
      case 'LOGIN_FAILURE':
          return {
              loggingIn: false,
              auth: null,
              token: null,
              message:action.message
          };
      case 'LOGOUT_FAILURE':
          return {
              auth: true,
              message:action.message
          };
      case 'LOGOUT_SUCCESS':
      return {
        auth: false,
          message:action.message
      };
      case 'SIGNUP_SUCCESS':
        return{
          message:action.message,
            data:action.data
        }
      case 'SIGNUP_FAILURE':
          return{
              message:action.message,
              data:action.data
          }

    default:
      return state
  }
}