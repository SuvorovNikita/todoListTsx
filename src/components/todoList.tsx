import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType, TaskType} from "../App";
import AddItemForm from "./AddItemForm";
import EditAbleSpan from "./EditAbleSpan";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValueType
    removeTask: (taskID: string, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeFilter: (value: FilterValueType, todoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todolistID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

export function TodoList(props: PropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title,props.id,)
    }


    const onAllClickHandler = () => props.changeFilter("all", props.id)

    const onActiveClickHandler = () => props.changeFilter('active', props.id)

    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)

    const removeTodoList = () => props.removeTodoList(props.id)

    return <div>
        <h3>
            <EditAbleSpan value={props.title} changeValue={changeTodoListTitle}/>
            <button onClick={removeTodoList}>Delete</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {

                    const removeTask = () => props.removeTask(t.id, props.id);
                    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(t.id, e.currentTarget.checked, props.id)
                    const changeTaskTitle = (value: string) => {
                        props.changeTaskTitle(t.id, value, props.id)
                    }

                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>

                        <input type="checkbox"
                               checked={t.isDone}
                               onChange={changeStatus}

                        />
                        <EditAbleSpan value={t.title} changeValue={changeTaskTitle}/>
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