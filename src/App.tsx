import React, {useState} from 'react';

import {TodoList} from "./components/todoList";

import './App.css';
import {v1} from 'uuid';
import AddItemForm from "./components/AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValueType = "all" | "active" | "completed";

function App() {

    let todoListID1 = v1();
    let todoListID2 = v1();

    const [todoLists, setTodoList] = useState<Array<TodoListType>>([
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTask] = useState<TasksStateType>({
            [todoListID1]: [
                {id: v1(), title: 'HTML', isDone: true},
                {id: v1(), title: 'JS', isDone: false},
                {id: v1(), title: 'TypeScript', isDone: true},
                {id: v1(), title: 'React', isDone: false}
            ],
            [todoListID2]: [
                {id: v1(), title: 'Book', isDone: true},
                {id: v1(), title: 'Disk', isDone: false},
                {id: v1(), title: 'Tea', isDone: true},
                {id: v1(), title: 'Coffee', isDone: false}
            ]
        }
    )

    function removeTask(taskID: string, todoListID: string) {
        let todoListTasks = tasks[todoListID]
        tasks[todoListID] = todoListTasks.filter(t => t.id !== taskID)
        setTask({...tasks})
    }

    function addTask(title: string, todoListID: string) {
        let todoListTasks = tasks[todoListID]
        let newTask: TaskType = {id: v1(), title: title, isDone: false}
        tasks[todoListID] = [newTask, ...todoListTasks]
        setTask({...tasks})
    }

    function changeStatus(taskID: string, isDone: boolean, todoListID: string) {
        let todoListTasks = tasks[todoListID]
        let task = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone;
            setTask({...tasks});
        }
    }

    function changeFilter(value: FilterValueType, todoListID: string) {
        let todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = value
            setTodoList([...todoLists])
        }
    }

    function removeTodoList(todolistID: string) {
        setTodoList(todoLists.filter(tl => tl.id !== todolistID))
        delete tasks[todolistID]
    }

    function addTodoList(title: string) {
        const newTodoListID = v1()
        const newTodoList: TodoListType = {
            id: newTodoListID, title: title, filter: "all"
        }
        setTodoList([...todoLists, newTodoList])
        setTask({...tasks, [newTodoListID]: []})
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {
                todoLists.map(tl => {

                        let tasksForTodoList = tasks[tl.id];

                        if (tl.filter === "active") {
                            tasksForTodoList = tasks[tl.id].filter(t => !t.isDone)
                        }

                        if (tl.filter === "completed") {
                            tasksForTodoList = tasks[tl.id].filter(t => t.isDone)
                        }

                        return (
                            <TodoList
                                title={tl.title}
                                filter={tl.filter}
                                id={tl.id}
                                key={tl.id}
                                tasks={tasksForTodoList}
                                changeFilter={changeFilter}
                                removeTask={removeTask}
                                addTask={addTask}
                                changeStatus={changeStatus}
                                removeTodoList={removeTodoList}
                            />
                        )
                    }
                )
            }
        </div>
    );
}

export default App;
