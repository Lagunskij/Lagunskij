import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTasksAC,
    tasksReducer
} from './tasks-reducer';
import {TasksStateType} from '../App';
import {AddTodoListAC, RemoveTodoListAC} from "./todolists-reducer";

let startState: TasksStateType



beforeEach(() => {
    startState = {
        "todolistID1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistID2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };
})



test('correct task should be deleted from correct array', () => {


    const action = removeTasksAC("2", "todolistID2");

    const endState = tasksReducer(startState, action)


expect(endState["todolistID1"].length).toBe(3);
expect(endState["todolistID2"].length).toBe(2);
expect(endState["todolistID2"].every( t => t.id !== "2")).toBeTruthy();

});

test('correct task should be added to correct array', () => {


    const action = addTaskAC("juce", "todolistID2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistID1"].length).toBe(3);
    expect(endState["todolistID2"].length).toBe(4);
    expect(endState["todolistID2"][0].id).toBeDefined();
    expect(endState["todolistID2"][0].title).toBe("juce");
    expect(endState["todolistID2"][0].isDone).toBe(false);
});

test('status of specified task should be changed', () => {


    const action = changeTaskStatusAC("2", false, "todolistID1");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistID2"][1].isDone).toBeTruthy();
    expect(endState["todolistID1"][1].isDone).toBe(false);
});



test('title of specified task should be changed', () => {

    let newTitle: string = "REDUX";
    const action = changeTaskTitleAC('todolistID1','1', newTitle);

    const endState = tasksReducer(startState, action)

    expect(endState["todolistID2"][1].title).toBe("milk");
    expect(endState["todolistID1"][0].title).toBe(newTitle);
});

test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };

    const action = AddTodoListAC("new todolist");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});


test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };

    const action = RemoveTodoListAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});


