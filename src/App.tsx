import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList/TodoList';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
    //BLL - Business logic level
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS/TS', isDone: false},
        {id: v1(), title: 'React', isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')
    const [state, setState] = useState<Array<Array<TaskType>>>([tasks]);

    const removeTask = (taskID: string) => {
        const filteredTasks = tasks.filter((t) => t.id !== taskID);
        setNewStateArray();
        setTasks(filteredTasks);
    }
    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        };
        setNewStateArray();
        setTasks([newTask, ...tasks]);
    }
    const changeTodoListFilter = (filter: FilterValuesType) => {
        setFilter(filter);
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
    const changeStatus = (id: string, newStatus: boolean) => {
        // const task = tasks.find(t => t.id === id);
        // if (task) task.isDone = newStatus;
        // const setCheckTasks = tasks.map((t) => {
        //     if (t.id === id) t.isDone = !t.isDone;
        //     return t;
        // });
        setNewStateArray();
        setTasks(tasks.map(t => t.id === id ? {...t, isDone: newStatus} : t))
        // setTasks([...tasks]);
    }

    let tasksForRender = tasks;
    if (filter === 'active') {
        tasksForRender = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForRender = tasks.filter(t => t.isDone)
    }

    return (
        <div className="App">
            <TodoList
                title={'What to do'}
                tasks={tasksForRender}
                filter={filter}
                removeTask={removeTask}
                onClickHandler={changeTodoListFilter}
                addTask={addTask}
                setLastState={returnLastState}
                changeTaskStatus={changeStatus}
            />
        </div>
    );
}

export default App;
