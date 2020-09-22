import React, {ChangeEvent, KeyboardEvent, useState} from "react";

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
            <input value={title}
                   onKeyPress={onKeyPressHandler}
                   onChange={onChangeHandler}
                   className={error ? 'error' : ''}
            />
            <button onClick={onAddTaskClick}>Add</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
    )
}

export default AddItemForm