import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox, TextFields} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onAddTaskClick()
        }
    }

    const onAddTaskClick = () => {
        if (title.trim()) {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Введите задачу')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    return (
        <div>
            <TextField variant='outlined'
                       value={title}
                       onKeyPress={onKeyPressHandler}
                       onChange={onChangeHandler}
                       error={!!error}
                       label='Title'
                       helperText={error}
            />

            <IconButton color='primary' onClick={onAddTaskClick}>
                <AddBox/>
            </IconButton>

        </div>
    )
}

export default AddItemForm