import {userService} from '../_services/';
import {history} from '../_helpers';

export const todoAction = {
  getTodo,
  getTodoById,
  onChangeProps,
  editTodoInfo,
  createTodo,
  downloadTodoById,
  deleteTodoById
};

function getTodo() {
  return dispatch => {
    let apiEndpoint = '/todos';
    userService.get(apiEndpoint)
        .then((response) => {
          dispatch(changeTodosList(response.data));
        }).catch((err) => {
    })
  };
}

function downloadTodoById(id) {
  return dispatch => {
    let apiEndpoint = '/todos/' + id + '/download';
    userService.get(apiEndpoint, true)
        .then((response) => {
          const blob = new Blob([response.data], {type: response.data.type});
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'attachment');
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(url);
        }).catch((err) => {
    })
  };
}

function createTodo(payload) {
  return dispatch => {
    let apiEndpoint = '/todos';
    userService.post(apiEndpoint, payload)
        .then((response) => {
          dispatch(createUserInfo());
          history.push('/todo');
        })
  }
}

function getTodoById(id) {

  return dispatch => {
    let apiEndpoint = '/todos/' + id;
    userService.get(apiEndpoint)
        .then((response) => {
          dispatch(editTodosDetails(response.data));
        })
  };
}

function onChangeProps(props, event) {
  return dispatch => {
    dispatch(handleOnChangeProps(props, event.target.value));
  }
}

function editTodoInfo(id, payload) {
  return dispatch => {
    let apiEndpoint = '/todos/' + id;
    userService.put(apiEndpoint, payload)
        .then((response) => {
          dispatch(updatedUserInfo());
          history.push('/todo');
        })
  }
}

function deleteTodoById(id) {
  return dispatch => {
    let apiEndpoint = '/todos/' + id;
    userService.deleteDetail(apiEndpoint)
        .then((response) => {
          dispatch(deleteTodosDetails());
          dispatch(todoAction.getTodo());
        })
  };
}

export function changeTodosList(todo) {
  return {
    type: "FETECHED_ALL_TODO",
    todo: todo
  }
}

export function handleOnChangeProps(props, value) {
  return {
    type: "HANDLE_ON_CHANGE",
    props: props,
    value: value
  }
}

export function editTodosDetails(todo) {
  return {
    type: "TODO_DETAIL",
    id: todo.id,
    name: todo.name,
    priority: todo.priority,
    fileName: todo.fileName
  }
}

export function updatedUserInfo() {
  return {
    type: "USER_UPDATED"
  }
}

export function createUserInfo() {
  return {
    type: "USER_CREATED_SUCCESSFULLY"
  }
}

export function deleteTodosDetails() {
  return {
    type: "DELETED_TODO_DETAILS"
  }
}