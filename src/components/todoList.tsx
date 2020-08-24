import React from "react";
import {FilterValueType, TaskType} from "../App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void;
    changeFilter: (value: FilterValueType) => void
}

export function TodoList(props: PropsType) {
    let {title, tasks} = props;
    return <div>
        <h3>{title}</h3>
        <div>
            <input/>
            <button>Add</button>
        </div>
        <ul>
            {
                tasks.map(t => <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => props.removeTask(t.id)}>Delete</button>
                </li>)
            }
        </ul>
        <div>
            <button onClick={() => props.changeFilter('all')}>All</button>
            <button onClick={() => props.changeFilter('active')}>Active</button>
            <button onClick={() => props.changeFilter('completed')}>Completed</button>
        </div>
    </div>
}