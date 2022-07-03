import React from 'react';
import {TodolistsType} from '../../App';
import {Button} from '../Button/Button';
import style from './ListOfTodolists.module.css'

type ListOfTodolistsPropsType = {
    todolists: TodolistsType[]
    tasks: {}
    deleteTodolist: (todolistID: string) => void
}

export const ListOfTodolists: React.FC<ListOfTodolistsPropsType> = (props) => {

    const deleteTodolistCallback = (todolistID: string) => {
        props.deleteTodolist(todolistID);
    }

    const listOfTodolistsJSX = props.todolists.map((t, index) => {
        const numberOfTodolist = index + 1;
        return (
            <TodolistItem
                key={t.id}
                numberOfItem={numberOfTodolist}
                todolistTitle={t.title}
                todolistID={t.id}
                deleteTodolist={deleteTodolistCallback}
            />
        )
    })

    return (
        props.todolists.length ?
            <table className={style.table}>
                <tbody>
                <tr>
                    <th>№ TL</th>
                    <th>Title TL</th>
                    <th>Dlt TL</th>
                </tr>
                {listOfTodolistsJSX}
                </tbody>
            </table>
:
            <div className={style.text}>Add your new Todolist</div>
    )
}

type TodolistItemPropsType = {
    numberOfItem: number
    todolistTitle: string
    todolistID: string
    deleteTodolist: (todolistID: string) => void
}

const TodolistItem: React.FC<TodolistItemPropsType> = (props) => {
    const deleteCallback = () => {
        props.deleteTodolist(props.todolistID);
    }
    return (
        <>
            <tr>
                <td>{props.numberOfItem}</td>
                <td>{props.todolistTitle}</td>
                <td><Button onClick={deleteCallback}>X</Button></td>
            </tr>

        </>
    );
};