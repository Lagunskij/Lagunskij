import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./TodoList";

type TaskPropsType = {
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    task: TaskType
    todolistID: string
}
export const Task = React.memo((props: TaskPropsType) => {
    console.log("RE")
    const removeTask = () => props.removeTask(props.task.id, props.todolistID)
    const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) =>
        props.changeTaskStatus(props.task.id, event.currentTarget.checked, props.todolistID)
    const changeTasksTitle = useCallback( (title: string) => {
        props.changeTaskTitle(props.task.id, title, props.todolistID)

    }, [props.task.id, props.changeTaskTitle, props.todolistID])
    return (
        <div key={props.task.id} className={props.task.isDone ? "is-Done" : ""}>
            <Checkbox
                checked={props.task.isDone}
                onChange={changeTaskStatus}/>

            <EditableSpan title={props.task.title} changeTitle={changeTasksTitle}/>

            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </div>
    )

})
