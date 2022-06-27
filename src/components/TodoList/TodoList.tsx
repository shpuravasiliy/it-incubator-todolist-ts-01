import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from '../../App';
import style from './TodoList.module.css'
import {Button} from '../Button/Button';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodoListPropsType = {
    title: string
    filter: FilterValuesType
    tasks: TaskType[]
    removeTask: (todolistID: string, taskID: string) => void
    onClickHandler: (todolistID: string, button: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    setLastState: () => void
    changeTaskStatus: (todolistID: string, taskID: string, newStatus: boolean) => void
    todolistID: string
    removeTodolist: (todolistID: string) => void
}

const TodoList = (props: TodoListPropsType) => {
    const tasksJSX = props.tasks.length ? props.tasks.map((t) => {
        const onClickHandler = () => props.removeTask(props.todolistID, t.id);
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked);
        return (
            <li key={t.id}>
                <span className={style.liSpan}>
                    <input
                        type="checkbox"
                        checked={t.isDone}
                        onChange={onChangeHandler}
                    />
                    <span className={t.isDone ? style.isDone : ''}>{t.title}</span>
                    <Button
                        onClick={onClickHandler}
                        children={'x'}
                    />
                </span>
            </li>
        )
    }) : <span>Enter your first task!</span>

    const [title, setTitle] = useState<string>('');
    const [titleRequired, setTitleRequired] = useState<boolean>(false)

    const addNewTask = () => {
        if (title.trim()) {
            props.addTask(props.todolistID, title);
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
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID);
    }
    const onAllClickHandler = () => props.onClickHandler(props.todolistID, 'all');
    const onActiveClickHandler = () => props.onClickHandler(props.todolistID, 'active');
    const onCompletedClickHandler = () => props.onClickHandler(props.todolistID, 'completed');

    return (
        <div className={style.todolist}>
            <h3 className={style.titleText}>{props.title} <Button onClick={removeTodolistHandler} children={'X'}/></h3>
            <div style={{display: 'flex'}}>
                <input
                    value={title}
                    placeholder="Enter new task"
                    onChange={onChangeHandler}
                    onKeyDown={onKeydownHandler}
                    className={titleRequired ? style.errorInput : ''}
                />
                <Button onClick={addNewTask} children={'+'}/>
                <Button onClick={props.setLastState} children={'undo'}/>
            </div>
            <div className={style.errorText}>{titleRequired ? 'Title is required' : ''}</div>
            <ul>
                {tasksJSX}
            </ul>
            <div className={style.filterButtons}>
                <Button
                    onClick={onAllClickHandler}
                    isActive={props.filter === 'all'}
                    children={'All'}
                />
                <Button
                    onClick={onActiveClickHandler}
                    isActive={props.filter === 'active'}
                    children={'Active'}
                />
                <Button
                    onClick={onCompletedClickHandler}
                    isActive={props.filter === 'completed'}
                    children={'Completed'}
                />
            </div>
        </div>
    );
}

export default TodoList;