import { combineReducers } from 'redux';

import { authentication } from './auth.reducer';
import { todo } from './todo.reducer';


const rootReducer = combineReducers({
  authentication,
  todo
});

export default rootReducer;
