import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './components/TodoList/TodoList';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';
type TodolistsType = {
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
    const [state, setState] = useState([tasks]);

    const removeTask = (todolistID: string, taskID: string) => {
        // const filteredTasks = tasks.filter((t) => t.id !== taskID);
        setNewStateArray();
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t=>t.id !== taskID)});
    };
    const addTask = (todolistID: string, title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        };
        setNewStateArray();
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]});
    }
    const changeTodoListFilter = (todolistID: string, filter: FilterValuesType) => {
        setTodolists(todolists.map(t=>t.id === todolistID ? {...t, filter: filter} : t));
    }
    const setNewStateArray = () => {
        let tempCheck = structuredClone(state);
        tempCheck.push(tasks);
        setState(tempCheck);
    }
    const returnLastState = () => {
        if (state.length > 1) {
            setTasks(state[state.length - 1]);
            state.pop();
            setState(state);
        }
    }
    const changeStatus = (todolistID: string, id: string, newStatus: boolean) => {
        // const task = tasks.find(t => t.id === id);
        // if (task) task.isDone = newStatus;
        // const setCheckTasks = tasks.map((t) => {
        //     if (t.id === id) t.isDone = !t.isDone;
        //     return t;
        // });
        setNewStateArray();
        // setTasks(tasks.map(t => t.id === id ? {...t, isDone: newStatus} : t))
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === id ? {...t, isDone: newStatus} : t)})
        // setTasks([...tasks]);
    }
    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(t => t.id !== todolistID))
        delete tasks[todolistID]
    }

    const todolistsJSX = todolists.map(t=>{
        let tasksForRender = tasks[t.id];
        if (t.filter === 'active') {
            tasksForRender = tasksForRender.filter(t => !t.isDone);
        }
        if (t.filter === 'completed') {
            tasksForRender = tasksForRender.filter(t => t.isDone);
        }
        return (
            <TodoList
                title={t.title}
                tasks={tasksForRender}
                filter={t.filter}
                removeTask={removeTask}
                onClickHandler={changeTodoListFilter}
                addTask={addTask}
                setLastState={returnLastState}
                changeTaskStatus={changeStatus}
                todolistID={t.id}
                removeTodolist={removeTodolist}
            />
        )
    })

    return (
        <div className="App">{todolistsJSX}</div>
    );
}

export default App;