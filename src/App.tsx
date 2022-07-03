import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType, TodolistStateType} from './components/TodoList/TodoList';
import {v1} from 'uuid';
import {AddTodolistForm} from './components/AddTodolistForm/AddTodolistForm';
import {ListOfTodolists} from './components/ListOfTodolists/ListOfTodolists';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
};

function App() {
    //BLL - Business logic level
    const todolistID1 = v1();
    const todolistID2 = v1();

    const [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]);
    const [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'HTML&CSS2', isDone: true},
            {id: v1(), title: 'JS2', isDone: true},
            {id: v1(), title: 'ReactJS2', isDone: false},
            {id: v1(), title: 'Rest API2', isDone: false},
            {id: v1(), title: 'GraphQL2', isDone: false},
        ],
    });

    const removeTask = (todolistID: string, taskID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== taskID)});
    };
    const addTask = (todolistID: string, title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        };
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]});
    }
    const changeTodoListFilter = (todolistID: string, filter: FilterValuesType) => {
        setTodolists(todolists.map(t => t.id === todolistID ? {...t, filter: filter} : t));
    }
    const changeStatus = (todolistID: string, id: string, newStatus: boolean) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === id ? {...t, isDone: newStatus} : t)})
    }
    const editTaskTitle = (todolistID: string, taskID: string, newTitle: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskID ? {...t, title: newTitle} : t)});
    }

    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(t => t.id !== todolistID))
        delete tasks[todolistID]
    }
    const addTodolist = (newTitle: string) => {
        const newTodolistID = v1();
        const newTodolist: TodolistsType = {id: newTodolistID, title: newTitle, filter: 'all'};
        setTodolists([newTodolist, ...todolists]);
        setTasks({...tasks, [newTodolistID]: []});
    }
    const editTodolistTitle = (todolistID: string, newTitle: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, title: newTitle} : tl));
    }
    const replaceTodolistState = (todolistID: string, todolistState: TodolistStateType) => {
        setTasks({...tasks, [todolistID]: [...todolistState.tasks]});
        setTodolists(todolists.map(tl => tl.id === todolistID ? {
            ...tl,
            title: todolistState.todolistTitle,
            filter: todolistState.todolistFilter
        } : tl));
    }

    const todolistsJSX = todolists.map(t => {
        let tasksForRender = tasks[t.id];
        if (t.filter === 'active') {
            tasksForRender = tasksForRender.filter(t => !t.isDone);
        }
        if (t.filter === 'completed') {
            tasksForRender = tasksForRender.filter(t => t.isDone);
        }
        return (
            <TodoList
                key={t.id}
                title={t.title}
                tasks={tasksForRender}
                filter={t.filter}
                removeTask={removeTask}
                onClickHandler={changeTodoListFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}
                todolistID={t.id}
                removeTodolist={removeTodolist}
                editTaskTitle={editTaskTitle}
                editTodolistTitle={editTodolistTitle}
                replaceTodolistState={replaceTodolistState}
            />
        )
    })

    return (
        <div className="App">
            <div className={'editForm'}>
                <AddTodolistForm
                    callBackHandler={addTodolist}
                />
                <ListOfTodolists
                    todolists={todolists}
                    tasks={tasks}
                    deleteTodolist={removeTodolist}
                />
            </div>
            {todolistsJSX}
        </div>
    );
}

export default App;