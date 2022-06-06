import React from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskID: number) => void
    onClickHandler:(button: FilterValuesType) => void
}

const TodoList = (props: TodoListPropsType) => {
    const tasksJSX = props.tasks.map((t) => {
        return (
            <li key={t.id}><input
                type="checkbox"
                checked={t.isDone}
            /> <span>{t.title}</span>
                <button onClick={() => {
                    props.removeTask(t.id)
                }}>x</button>
            </li>
        )
    })
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button onClick={() => {
                    props.onClickHandler('all')
                }}>All</button>
                <button onClick={() => {
                    props.onClickHandler('active')
                }}>Active</button>
                <button onClick={() => {
                    props.onClickHandler('completed')
                }}>Completed</button>
            </div>
        </div>
    );
}

export default TodoList;