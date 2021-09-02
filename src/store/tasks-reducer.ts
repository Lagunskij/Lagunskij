import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todolists-reducer";


export type RemoveTasksAT = {
    type: "REMOVE-TASK",
    taskID: string,
    todoListID: string
}
export type addTaskAT = {
    type: "ADD-TASK",
    title: string,
    todoListID: string
}

export type changeTaskStatusAT = {
    type: "CHANGE-TASK-STATUS",
    taskID: string,
    isDone: boolean,
    todoListID: string
}

export type changeTaskTitleAT = {
    type: "CHANGE-TASK-TITLE",
    taskID: string,
    title: string,
    todoListID: string
}


export type ActionsType = RemoveTasksAT | addTaskAT | changeTaskStatusAT |
    changeTaskTitleAT | AddTodoListAT | RemoveTodoListAT

const initialState: TasksStateType = {
    /*   [todoListID_1]: [
           {id: v1(), title: "HTML", isDone: false},
           {id: v1(), title: "CSS", isDone: true},
           {id: v1(), title: "JS", isDone: false},
       ],
       [todoListID_2]: [
           {id: v1(), title: "Beer", isDone: false},
           {id: v1(), title: "Milk", isDone: true},
           {id: v1(), title: "Water", isDone: false},
       ]*/
}


export const tasksReducer = (state = initialState, action: ActionsType):
    TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state};
            stateCopy[action.todoListID] = stateCopy[action.todoListID]
                .filter(t => t.id !== action.taskID);
            return stateCopy;
        }
        case "ADD-TASK": {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todoListID];
            const newTask = {id: v1(), title: action.title, isDone: false};
            stateCopy[action.todoListID] = [newTask, ...tasks];
            return stateCopy;
        }
        case "CHANGE-TASK-STATUS": {

            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(t => t.id === action.taskID ?
                    {...t, isDone: action.isDone}
                    : t)
            }
        }
        case "CHANGE-TASK-TITLE": {

            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(t => t.id === action.taskID ?
                    {...t, title: action.title}
                    : t)
            }
        }
        case "ADD-TODOLIST" : {
            const stateCopy = {...state};
            stateCopy[action.todolistID] = [];
            return stateCopy;
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state};
            delete stateCopy[action.todoListID]
            return stateCopy;
        }
        default:
            return state;
    }
}

export const removeTasksAC = (taskID: string, todoListID: string): RemoveTasksAT => {
    return {
        type: "REMOVE-TASK",
        taskID,
        todoListID
    }
}
export const addTaskAC = (title: string, todoListID: string): addTaskAT => {
    return {
        type: "ADD-TASK",
        title: title,
        todoListID: todoListID
    }
}

export const changeTaskStatusAC = (taskID: string,
                                   isDone: boolean,
                                   todoListID: string): changeTaskStatusAT => {
    return {
        type: "CHANGE-TASK-STATUS",
        taskID,
        isDone,
        todoListID
    }
}

export const changeTaskTitleAC = (todoListID: string,
                                  taskID: string,
                                  title: string,
): changeTaskTitleAT => {
    return {
        type: "CHANGE-TASK-TITLE",
        todoListID,
        taskID,
        title
    }
}

export const addTodolistAC = (title: string): AddTodoListAT => {
    return {
        type: "ADD-TODOLIST",
        title,
        todolistID: v1()
    }
}
