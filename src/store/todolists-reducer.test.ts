import {
    ActionType,
    AddTodoListAC,
    ChangeTodoListFilterAC, ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TodoListType} from '../App';

let todolistID1:string;
let todolistID2: string;

let startState: Array<TodoListType>

beforeEach(() => {
   todolistID1 = v1();
   todolistID2 = v1();

    startState = [
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"}
    ]
})



test('correct todolist should be removed', () => {


    const endState = todolistsReducer(startState, RemoveTodoListAC(todolistID1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistID2);
});


test('correct todolist should be add TODOLIST', () => {

    let newTodo = "What to drink"


    const endState = todolistsReducer(startState, AddTodoListAC(newTodo))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe("What to drink");
});


test('correct todolist should change its name', () => {


    let newTodolistTitle = "New Todolist";



    const action: ActionType = ChangeTodoListTitleAC(newTodolistTitle, todolistID2);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});


test('correct todolist should be change filter', () => {


    let newFilter: FilterValuesType = "completed";


    const action = ChangeTodoListFilterAC(todolistID1, newFilter)
    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe("completed");
    expect(endState[1].filter).toBe('all');
});

















