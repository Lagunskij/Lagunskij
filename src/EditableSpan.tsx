import React, {KeyboardEvent, ChangeEvent, useState} from 'react'
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}


const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('EditableSpan called')
    const [title, setTitle] = useState<string>(props.title)
    const [editMode, setEditMode] = useState<boolean>(false)
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") offEditMode()
    }
    return (
        editMode
            ? <TextField
                value={title}
                autoFocus={true}
                onBlur={offEditMode}
                onChange={onTitleChangeHandler}
                onKeyPress={onKeyHandler}
            />


            : <span onDoubleClick={onEditMode}>{props.title} </span>
    )
})


export default EditableSpan;
