import React, {useState} from 'react';

import {TodoList} from "./components/todoList";

import './App.css';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValueType = "all" | "active" | "completed";


function App() {

    const [task, setTask] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'JS', isDone: false},
        {id: 3, title: 'TS', isDone: true}
    ])

    const [filter, setFilter] = useState<FilterValueType>("all")

    let tasksForTodoList = task;

    if (filter === "active") {
        tasksForTodoList = task.filter(t => !t.isDone)
    }
    if (filter === "completed") {
        tasksForTodoList = task.filter(t => t.isDone)
    }

    function removeTask(id: number) {
        let filteredTasks = task.filter(t => t.id !== id);
        setTask(filteredTasks);
    }

    function changeFilter(value: FilterValueType) {
        setFilter(value)
    }

    return (
        <div className="App">
            <TodoList title='What to learn'
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
