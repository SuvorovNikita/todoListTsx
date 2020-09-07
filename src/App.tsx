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

    const [tasks, setTask] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'TS', isDone: true}
    ])

    const [filter, setFilter] = useState<FilterValueType>("all")

    let tasksForTodoList = tasks;

    if (filter === "active") {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }

    if (filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTask(filteredTasks);
    }

    function changeFilter(value: FilterValueType) {
        setFilter(value)
    }

    function addTask(title: string) {
        let newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTask([newTask, ...tasks])
    }

    function changeStatus(id: string, isDone: boolean) {
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone;
            setTask([...tasks]);
        }
    }


    return (
        <div className="App">
            <TodoList title='What to learn'
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeFilter={changeFilter}
                      changeStatus={changeStatus}
                      filter={filter}

            />
        </div>
    );
}

export default App;
