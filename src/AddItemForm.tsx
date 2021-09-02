import React, {KeyboardEvent, ChangeEvent, useState} from 'react'
import {AddBox} from "@material-ui/icons";
import {IconButton, TextField} from "@material-ui/core";

type AddItemFormPropsType = {
    addItem: (title: string) => void

}


const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log("AddItemForm called")
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        /*setError("false")*/
    }
    const addItem = () => {
        /*const trimmedTitle = title.trim()*/
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError(errorMessage)
        }
    }

    const errorMessage = "Title is required!"

    const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.key === "Enter") {
            addItem();
        }
    }
    return (
        <div>
            <TextField
                size={"small"}
                value={title}
                variant={"outlined"}
                label={'Title'}
                onChange={onTitleChangeHandler}
                onKeyPress={onKeyHandler}
                error={!!error}
                helperText={error && errorMessage}
            />
            <IconButton
                color={"primary"}
                size={"small"}
                onClick={addItem}>
                <AddBox/>
            </IconButton>
        </div>
    )
});


export default AddItemForm;
