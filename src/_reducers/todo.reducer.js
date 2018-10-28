const initialState = { anchor: 'left',
    todo: [],
    open: false,
    id: '',  
    name: '',
    priority:'',
    fileName:''
 };


export function todo(state = initialState, action) {
    switch (action.type) {
        case 'FETECHED_ALL_TODO':
            return {
            ...state,
            todo: action.todo
            };
        case 'TODO_DETAIL':
            return {
                ...state,
                id: action.id,  
                name: action.name,
                priority: action.priority,
                fileName: action.fileName
            };
        case "USER_UPDATED":
            return state;
        case "HANDLE_ON_CHANGE":
            return {
                ...state,
                [action.props]: action.value
            };    
        default:
            return state
    }
  }