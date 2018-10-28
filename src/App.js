import React, { Component } from 'react';
import './App.css';
import { Router, Switch, Route} from 'react-router-dom';
import { Todo } from './todos/todo.component';
import { AddTodo } from './todos/addtodo.component'
import  { Login } from './login/';
import  { Signup } from './signup/';
import { history } from './_helpers';
import { PrivateRoute } from './_components';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <div>            
              <Switch>
                <PrivateRoute exact path='/todo' component={Todo} />
                <PrivateRoute exact path='/add-todo' component={AddTodo} />
                <PrivateRoute exact path='/edit-todo/:id' component={AddTodo} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/' component={Login} />
                <Route exact path='/signup' component={Signup} />
              </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
