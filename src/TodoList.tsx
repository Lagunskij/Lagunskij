import React, {useCallback} from 'react'
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";


type TodoListPropsType = {
    filter: FilterValuesType
    title: string
    tasks: Array<TaskType>
    addTask: (title: string, todoListID: string) => void
    changeFilter: (nextFilter: FilterValuesType, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    id: string
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, id: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList = React.memo((props: TodoListPropsType) => {
    console.log("TODOLIST is CALL")

    const onAllClickHandler = useCallback( () => props.changeFilter("all", props.id), [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback( () => props.changeFilter("active", props.id), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback( () => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);

    const removeToDoList = () => {
        props.removeTodoList(props.id);
    }
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const changeTodoListTitle = useCallback( (title: string) => {
        props.changeTodoListTitle(title, props.id)
    }, [props.changeTodoListTitle, props.id])


    return (
        <div>

            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>

                <IconButton
                    size={"small"}
                    onClick={removeToDoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>

            <div>
                {
                   props.tasks.map(t => <Task task={t}
                                              changeTaskStatus={props.changeTaskStatus}
                                              changeTaskTitle={props.changeTaskTitle}
                                              removeTask={props.removeTask}
                                              todolistID={props.id}
                                              key={t.id}
                   />)
                }
            </div>
            <div>
                <Button
                    size={"small"}
                    variant={props.filter === "all" ? "contained" : "text"}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    size={"small"}
                    color={"primary"}
                    variant={props.filter === "active" ? "contained" : "text"}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button size={"small"}
                        color={"secondary"}
                        variant={props.filter === "completed" ? "contained" : "text"}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
})

export default TodoList;

