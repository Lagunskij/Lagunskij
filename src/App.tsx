import React, {useState} from 'react'
import './App.css'
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {Button, Container, Grid, IconButton, Paper, Toolbar} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import {Menu} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";


export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const App = () => {
    console.log(v1())
    // BLL:
    const todoListID_1 = v1();
    const todoListID_2 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: "What to learn?", filter: 'all'},
        {id: todoListID_2, title: "What to buy?", filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListID_1]: [
            {id: v1(), title: "HTML", isDone: false},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "Beer", isDone: false},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Water", isDone: true},
        ]
    })


    const removeTask = (taskID: string, todoListID: string) => {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID);
        setTasks({...tasks});
    }

    const addTask = (title: string, todoListID: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        tasks[todoListID] = [newTask, ...tasks[todoListID]];
        setTasks({...tasks})
    }

    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {

        tasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, isDone: isDone} : t)
        setTasks({...tasks})
    }

    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {

        tasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, title} : t)
        setTasks({...tasks})
    }


    const changeTodoListFilter = (nextFilter: FilterValuesType, todoListID: string) => {
        setTodoLists
        (todoLists.map(tl => tl.id === todoListID ?
            {...tl, filter: nextFilter} : tl)
        )
    }

    const changeTodoListTitle = (title: string, todoListID: string) => {
        setTodoLists
        (todoLists.map(tl => tl.id === todoListID ? {...tl, title} : tl)
        )
    }

    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID));
        const copyTask = {... tasks}
        delete copyTask[todoListID]
        setTasks(copyTask)
    };

    const addTodoList = (title: string) => {
        const todoListID = v1()
        const newTodoList: TodoListType = {
            id: todoListID,
            title: title,
            filter: "all"
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [todoListID]: []})
    }

// UI:
    const getTasksForRender = (todoList: TodoListType): TaskType[] => {
        switch (todoList.filter) {
            case "completed":
                return tasks[todoList.id].filter(t => t.isDone)
            case "active":
                return tasks[todoList.id].filter(t => !t.isDone)
            default:
                return tasks[todoList.id]
        }
    }
    // let tasksForRender = tasks
    // if(filter === "active"){
    //     tasksForRender = tasks.filter(t => !t.isDone)
    // }
    // if(filter === "completed"){
    //     tasksForRender = tasks.filter(t => t.isDone)
    // }

    const todoListComponents = todoLists.map(tl => {
        return (

            <Grid item key={tl.id} style={{padding: "20px 10px 0 20px"}}>
                <Paper elevation={10} style={{padding: "10px 0 10px 10px"}}>
                    <TodoList
                        id={tl.id}
                        filter={tl.filter}
                        title={tl.title}
                        tasks={getTasksForRender(tl)}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeFilter={changeTodoListFilter}
                        changeTaskStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    });

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent:"space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button
                        variant={"outlined"}
                        color="inherit"
                    >
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding:"10px 0"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
