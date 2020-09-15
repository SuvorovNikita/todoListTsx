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

type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}


function App() {

    const [tasks, setTask] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'TS', isDone: true}
    ])

    const [filter, setFilter] = useState<FilterValueType>("all")

    const [todoList, setTodoList] = useState<Array<TodoListType>>([
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'What to buy', filter: 'all'},
    ])

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
            {
                todoList.map(tl =>
                    <TodoList title={tl.title}
                              filter={tl.filter}
                              id={tl.id}
                              key={tl.id}
                              tasks={tasksForTodoList}
                              removeTask={removeTask}
                              addTask={addTask}
                              changeFilter={changeFilter}
                              changeStatus={changeStatus}
                    />
                )
            }
        </div>
    );
}

export default App;
