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
        const onClickHandler = () => props.removeTask(t.id);

        return (
            <li key={t.id}><input
                type="checkbox"
                checked={t.isDone}
                onChange={() => {
                    props.setCheck(t.id)
                }}
            /> <span>{t.title}</span>
                <button
                    onClick={onClickHandler}
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
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);
    const onKeydownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addNewTask();
        }
    }
    const onAllClickHandler = () => props.onClickHandler('all');
    const onActiveClickHandler = () => props.onClickHandler('active');
    const onCompletedClickHandler = () => props.onClickHandler('completed');



    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    placeholder='Enter new task'
                    onChange={onChangeHandler}
                    onKeyDown={onKeydownHandler}
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
                    onClick={onAllClickHandler}
                >All
                </button>
                <button
                    onClick={onActiveClickHandler}
                >Active
                </button>
                <button
                    onClick={onCompletedClickHandler}
                >Completed
                </button>
            </div>
        </div>
    );
}

export default TodoList;