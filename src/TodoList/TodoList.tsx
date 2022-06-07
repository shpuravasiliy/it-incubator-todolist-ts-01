import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from '../App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskID: string) => void
    onClickHandler: (button: FilterValuesType) => void
    addTask: (title: string) => void
    setLastState: () => void
    setCheck: (taskID: string) => void
}

const TodoList = (props: TodoListPropsType) => {
    const tasksJSX = props.tasks.map((t) => {
        return (
            <li key={t.id}><input
                type="checkbox"
                checked={t.isDone}
                onChange={() => {
                    props.setCheck(t.id)
                }}
            /> <span>{t.title}</span>
                <button
                    onClick={() => {
                        props.removeTask(t.id)
                    }}
                >x
                </button>
            </li>
        )
    })
    const [title, setTitle] = useState<string>('');

    const addNewTask = () => {
        props.addTask(title);
        setTitle('');
    }
    const enterNewTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);
    const enterNewTitleFromKeyEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addNewTask();
        }
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    placeholder='Enter new task'
                    onChange={enterNewTitle}
                    onKeyDown={enterNewTitleFromKeyEnter}
                />
                <button onClick={addNewTask}>+</button>
            </div>
            <div>
                <button onClick={props.setLastState}>undo</button>
            </div>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button
                    onClick={() => {props.onClickHandler('all')}}
                >All
                </button>
                <button
                    onClick={() => {props.onClickHandler('active')}}
                >Active
                </button>
                <button
                    onClick={() => {props.onClickHandler('completed')}}
                >Completed
                </button>
            </div>
        </div>
    );
}

export default TodoList;