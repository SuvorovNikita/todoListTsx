import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType, TaskType} from "../App";
import AddItemForm from "./AddItemForm";
import EditAbleSpan from "./EditAbleSpan";
import IconButton from "@material-ui/core/IconButton";
import {CheckBox, Delete} from "@material-ui/icons";
import { Button, Checkbox } from "@material-ui/core";

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
        props.changeTodoListTitle(title, props.id,)
    }


    const onAllClickHandler = () => props.changeFilter("all", props.id)

    const onActiveClickHandler = () => props.changeFilter('active', props.id)

    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)

    const removeTodoList = () => props.removeTodoList(props.id)

    return <div>
        <h3>
            <EditAbleSpan value={props.title} changeValue={changeTodoListTitle}/>
            <IconButton onClick={removeTodoList}>
                <Delete/>
            </IconButton>
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

                        <Checkbox
                            checked={t.isDone}
                            onChange={changeStatus}
                            color='primary'
                        />
                        <EditAbleSpan value={t.title} changeValue={changeTaskTitle}/>
                        <IconButton onClick={removeTask}>
                            <Delete/>
                        </IconButton>
                    </li>
                })
            }

        </ul>
        <div>
            <Button variant='contained' color={props.filter === 'all' ? 'primary' : 'default'}  onClick={onAllClickHandler}>All</Button>
            <Button variant='contained'  color={props.filter === 'active' ? 'primary' : 'default'}  onClick={onActiveClickHandler}>Active
            </Button>
            <Button variant='contained' color={props.filter === 'completed' ? 'primary' : 'default'}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>

}