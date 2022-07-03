import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from '../../App';
import style from './TodoList.module.css'
import {Button} from '../Button/Button';
import {MyInput} from '../MyInput/MyInput';
import {EditableSpan} from '../EditableSpan/EditableSpan';

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
    // setLastState: (todolistID: string) => void
    changeTaskStatus: (todolistID: string, taskID: string, newStatus: boolean) => void
    todolistID: string
    removeTodolist: (todolistID: string) => void
    editTaskTitle: (todolistID: string, taskID: string, newTitle: string) => void
    editTodolistTitle: (todolistID: string, newTitle: string) => void
    replaceTodolistState: (todolistID: string, todolistState: TodolistStateType) => void
}
export type TodolistStateType = {
    todolistTitle: string
    todolistFilter: FilterValuesType
    tasks: TaskType[]
}

const TodoList = (props: TodoListPropsType) => {

    const [todolistState, setTodolistState] = useState<TodolistStateType[]>([]);

    const setNewTodolistStateArray = () => {
        setTodolistState([...todolistState, {todolistTitle: props.title, todolistFilter: props.filter, tasks: props.tasks}]);
        // newTitle ? setTodolistState([...todolistState, {type: 'title', title: newTitle}]) : newTask ? setTodolistState([...todolistState, {type: 'task', title: newTask.id, task: {...newTask}}]) : '';
    }
    const returnLastTodolistState = () => {
        if (todolistState.length) {
            props.replaceTodolistState(props.todolistID, todolistState[todolistState.length - 1]);
            todolistState.pop();
            setTodolistState([...todolistState]);

        }
        // const lastState = todolistState[todolistState.length - 1];
        // lastState.type === 'title' ? props.editTodolistTitle(props.todolistID, lastState.title) : lastState.task ? props.replaceTask(props.todolistID, lastState.title, lastState.task) : '';
        // const lastStateTask: TaskType;
        // lastState.valueOf() === '[object Object]' ? props.replaceTask(props.todolistID, lastState.id, lastState)
        //   editTaskTitleHandler(props.todolistID, )
        // delete todolistState[todolistState.length - 1]
    }

    const tasksJSX = props.tasks.length ? props.tasks.map((t) => {
        const onClickHandler = () => {
            setNewTodolistStateArray();
            props.removeTask(props.todolistID, t.id);
        };
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setNewTodolistStateArray();
            props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked);
        };
        return (
            <li key={t.id}>
                <span className={style.liSpan}>
                    <input
                        type="checkbox"
                        checked={t.isDone}
                        onChange={onChangeHandler}
                    />
                    <EditableSpan
                        title={t.title}
                        editedInputValue={(newValue) => editTaskTitleHandler(props.todolistID, t.id, newValue)}
                        isDone={t.isDone}
                    />
                    {/*<span className={t.isDone ? style.isDone : ''}>{t.title}</span>*/}
                    <Button
                        onClick={onClickHandler}
                        children={'x'}
                    />
                </span>
            </li>
        )
    }) : <span>Enter your first task!</span>;

    const addNewTask = (newTitle: string) => {
        setNewTodolistStateArray();
        props.addTask(props.todolistID, newTitle);
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID);
    }
    const onAllClickHandler = () => {
        setNewTodolistStateArray();
        props.onClickHandler(props.todolistID, 'all');
    };
    const onActiveClickHandler = () => {
        setNewTodolistStateArray();
        props.onClickHandler(props.todolistID, 'active');
    };
    const onCompletedClickHandler = () => {
        setNewTodolistStateArray();
        props.onClickHandler(props.todolistID, 'completed');
    };
    const editTaskTitleHandler = (todolistID: string, taskID: string, newTitle: string) => {
        setNewTodolistStateArray();
        props.editTaskTitle(todolistID, taskID, newTitle);
    }
    const editTodolistTitleHandler = (todolistID: string, newTitle: string) => {
        setNewTodolistStateArray();
        props.editTodolistTitle(props.todolistID, newTitle);
    }

    return (
        <div className={style.todolist}>
            <h3 className={style.titleText}><EditableSpan
                title={props.title}
                editedInputValue={(newTitle) => editTodolistTitleHandler(props.todolistID, newTitle)}
            /> <Button
                onClick={removeTodolistHandler}
                children={'X'}
            /></h3>
            <MyInput
                btnTitle={'+'}
                placeholder={'Enter new task'}
                callBack={addNewTask}
            />
            < Button
                // onClick={() => props.setLastState(props.todolistID)}
                onClick={returnLastTodolistState}
                children={'undo'}
                disabled={!todolistState.length}
            />
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