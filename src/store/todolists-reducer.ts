import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";


export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    todoListID: string
}

export type AddTodoListAT = {
    type: 'ADD-TODOLIST',
    title: string,
    todolistID: string

}

export type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE",
    title: string,
    todoListID: string
}

export type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    value: FilterValuesType,
    todoListID: string

}

export const todoListID_1 = v1();
export const todoListID_2 = v1();

export type ActionType = RemoveTodoListAT | AddTodoListAT |
    ChangeTodoListTitleAT | ChangeTodoListFilterAT

const initialState: Array<TodoListType> = [
    /*{id: todoListID_1, title: "What to learn?", filter: 'all'},
    {id: todoListID_2, title: "What to buy?", filter: 'all'},*/
]


export const todolistsReducer = (state = initialState, action: ActionType):
    Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoListID);


        case "ADD-TODOLIST":
            const newTodoList: TodoListType = {
                id: action.todolistID,
                title: action.title,
                filter: "all"
            }
            return [newTodoList, ...state]


        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl);

        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.todoListID ?
                {...tl, filter: action.value} : tl);

        default:
            return state;
    }
}

export const RemoveTodoListAC = (todoListID: string): RemoveTodoListAT => {
    return {
        type: "REMOVE-TODOLIST",
        todoListID: todoListID
    }
}
export const AddTodoListAC = (title: string): AddTodoListAT => {
    return {
        type: 'ADD-TODOLIST',
        title: title,
        todolistID: v1()
    }
}

export const ChangeTodoListTitleAC = (title: string, todoListID: string): ChangeTodoListTitleAT => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        title,
        todoListID
    }
}


export const ChangeTodoListFilterAC = (todoListID: string, filter: FilterValuesType): ChangeTodoListFilterAT => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        value: filter,
        todoListID: todoListID
    }
}


