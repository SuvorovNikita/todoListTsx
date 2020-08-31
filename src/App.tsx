import React, {useState} from 'react';

import {TodoList} from "./components/todoList";

import './App.css';
import {v1} from 'uuid';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValueType = "all" | "active" | "completed";


function App() {

    const [task, setTask] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'TS', isDone: true}
    ])

    const [filter, setFilter] = useState<FilterValueType>("all")

    let tasksForTodoList = task;

    if (filter === "active") {
        tasksForTodoList = task.filter(t => !t.isDone)
    }

    if (filter === "completed") {
        tasksForTodoList = task.filter(t => t.isDone)
    }

    function removeTask(id: string) {
        let filteredTasks = task.filter(t => t.id !== id);
        setTask(filteredTasks);
    }

    function changeFilter(value: FilterValueType) {
        setFilter(value)
    }

    function addTask(title: string) {
        let newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTask([newTask, ...task])

    }


    return (
        <div className="App">
            <TodoList title='What to learn'
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
