import React from 'react';
import './App.css';
import {TodoList} from "./todoList";

function App() {

    const tasks1 = [
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'JS', isDone: false},
        {id: 3, title: 'TS', isDone: true},

    ]

    const tasks2 = [
        {id: 1, title: 'Game', isDone: true},
        {id: 2, title: 'Songs', isDone: false},
        {id: 3, title: 'What to learn', isDone: true}
    ]

    return (
        <div className="App">
            <TodoList title='Game' tasks={tasks1}/>
            <TodoList title='Songs' tasks={tasks2}/>
        </div>
    );
}

export default App;
