import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType, TaskType} from "../App";


type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    addTask: (title: string) => void
    changeFilter: (value: FilterValueType) => void
}

export function TodoList(props: PropsType) {

    let [title, setTitle] = useState<string>('')

    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }

    const onAllClickHandler = () => props.changeFilter('all')

    const onActiveClickHandler = () => props.changeFilter('active')

    const onCompletedClickHandler = () => props.changeFilter('completed')

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onKeyPress={onKeyPressHandler}
                   onChange={onChangeHandler}
            />
            <button onClick={addTask}>Add</button>
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const removeTask = () => props.removeTask(t.id);

                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={removeTask}>Delete</button>
                    </li>
                })
            }


        </ul>
        <div>
            <button onClick={onAllClickHandler}>All</button>
            <button onClick={onActiveClickHandler}>Active</button>
            <button onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}