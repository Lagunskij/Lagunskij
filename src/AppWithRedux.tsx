import React, {useCallback} from 'react'
import './App.css'
import TodoList, {TaskType} from "./TodoList";

import {Button, Container, Grid, IconButton, Paper, Toolbar} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import {Menu} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTasksAC,} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./store/store";
import AddItemForm from "./AddItemForm";


export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const AppWithRedux = () => {
    console.log("App is Called")
    // BLL:
    const dispatch = useDispatch();

    const todoLists = useSelector<AppRootState, Array<TodoListType>>(state => state.todolist);
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks);


    const removeTask = useCallback((taskID: string, todoListID: string) => {
        dispatch(removeTasksAC(taskID, todoListID))
    }, [dispatch]);

    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskAC(title, todoListID))
    }, [dispatch]);

    const changeTaskStatus = useCallback((taskID: string, isDone: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskID, isDone, todoListID))
    }, [dispatch]);

    const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(todoListID, taskID, title))
    }, [dispatch]);

    const changeTodoListFilter = useCallback((value: FilterValuesType, todoListID: string) => {
        dispatch(ChangeTodoListFilterAC(todoListID, value))
    }, [dispatch]);

    const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
        dispatch(ChangeTodoListTitleAC(title, todoListID))
    }, [dispatch]);

    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(RemoveTodoListAC(todoListID));
    }, [dispatch]);

    const addTodoList = useCallback((title: string) => {
        dispatch(AddTodoListAC(title));
    }, [dispatch]);


// UI:
/*    const getTasksForRender = (todoList: TodoListType): TaskType[] => {
        switch (todoList.filter) {
            case "completed":
                return tasks[todoList.id].filter(t => t.isDone)
            case "active":
                return tasks[todoList.id].filter(t => !t.isDone)
            default:
                return tasks[todoList.id]
        }
    };*/




    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
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
                <Grid container style={{padding: "10px 0"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={5}>

                    {
                        todoLists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];


                            return <Grid item key={tl.id} style={{padding: "20px 10px 0 20px"}}>
                                <Paper elevation={13} style={{padding: "10px 0 10px 10px"}}>
                                    <TodoList
                                        id={tl.id}
                                        filter={tl.filter}
                                        title={tl.title}
                                        tasks={allTodolistTasks}
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
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
