import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from '../App';
import style from './TodoList.module.css'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodoListPropsType = {
    title: string
    filter: FilterValuesType
    tasks: TaskType[]
    removeTask: (taskID: string) => void
    onClickHandler: (button: FilterValuesType) => void
    addTask: (title: string) => void
    setLastState: () => void
    changeTaskStatus: (taskID: string, newStatus: boolean) => void
}

const TodoList = (props: TodoListPropsType) => {
    const tasksJSX = props.tasks.length ? props.tasks.map((t) => {
        const onClickHandler = () => props.removeTask(t.id);
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked);
        return (
            <li key={t.id}><input
                type="checkbox"
                checked={t.isDone}
                onChange={onChangeHandler}
            />
                <span className={t.isDone ? style.isDone : ''}>{t.title}</span>
                <button onClick={onClickHandler}>x</button>
            </li>
        )
    }) : <span>Enter your first task!</span>
    const [title, setTitle] = useState<string>('');
    const [titleRequired, setTitleRequired] = useState<boolean>(false)

    const addNewTask = () => {
        if (title.trim()) {
            props.addTask(title);
        } else {
            !titleRequired && setTitleRequired(true);
        }
        setTitle('');
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        titleRequired && setTitleRequired(false);
        setTitle(e.currentTarget.value);
    };
    const onKeydownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addNewTask();
        }
    }
    const onAllClickHandler = () => props.onClickHandler('all');
    const onActiveClickHandler = () => props.onClickHandler('active');
    const onCompletedClickHandler = () => props.onClickHandler('completed');

    return (
        <div className={style.todolist}>
            <h3 className={style.titleText}>{props.title}</h3>
            <div>
                <input
                    value={title}
                    placeholder='Enter new task'
                    onChange={onChangeHandler}
                    onKeyDown={onKeydownHandler}
                    className={titleRequired ? style.errorInput : ''}
                />
                <button onClick={addNewTask}>+</button>
            </div>
            <div className={style.errorText}>{titleRequired ? 'Title is required' : ''}</div>
            <div>
                <button onClick={props.setLastState}>undo</button>
            </div>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button onClick={onAllClickHandler} className={`${props.filter === 'all' ? style.activeFilterButton : ''} ${style.filterButton}`}>All</button>
                <button onClick={onActiveClickHandler} className={`${props.filter === 'active' ? style.activeFilterButton : ''} ${style.filterButton}`}>Active</button>
                <button onClick={onCompletedClickHandler} className={`${props.filter === 'completed' ? style.activeFilterButton : ''} ${style.filterButton}`}>Completed</button>
            </div>
        </div>
    );
}

export default TodoList;