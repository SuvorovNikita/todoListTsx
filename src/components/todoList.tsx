import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType, TaskType} from "../App";


type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    addTask: (title: string) => void
    changeFilter: (value: FilterValueType, todoListID: string) => void
    filter: FilterValueType
    changeStatus: (id: string, isDone: boolean) => void
}

export function TodoList(props: PropsType) {

    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim()) {
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Введите задачу')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id)

    const onActiveClickHandler = () => props.changeFilter('active',props.id)

    const onCompletedClickHandler = () => props.changeFilter('completed',props.id)

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onKeyPress={onKeyPressHandler}
                   onChange={onChangeHandler}
                   className={error ? 'error' : ''}
            />
            <button onClick={addTask}>Add</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const removeTask = () => props.removeTask(t.id);
                    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(t.id, e.currentTarget.checked)

                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>

                        <input type="checkbox"
                               checked={t.isDone}
                               onChange={changeStatus}

                        />
                        <span>{t.title}</span>
                        <button onClick={removeTask}>Delete</button>
                    </li>
                })
            }

        </ul>
        <div>
            <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>

}