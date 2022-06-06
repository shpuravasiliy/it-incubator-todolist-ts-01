import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList';

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
    //BLL - Business logic level
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS/TS', isDone: false},
        {id: 3, title: 'React', isDone: false}
    ])

    // let tasks: Array<TaskType> = [
    //     {id: 1, title: 'HTML&CSS', isDone: true},
    //     {id: 2, title: 'JS/TS', isDone: false},
    //     {id: 3, title: 'React', isDone: false}
    // ];

    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (taskID: number) => {
        const filteredTasks = tasks.filter((t) => t.id !== taskID);
        setTasks(filteredTasks);
    }

    const onClickHandler = (filter: FilterValuesType) => {
        setFilter(filter);
    }

    let tasksForRender = tasks;
    if (filter === 'active') {
        tasksForRender = tasks.filter(t => t.isDone === false)
    }
    if (filter === 'completed') {
        tasksForRender = tasks.filter(t => t.isDone === true)
    }

    return (
        <div className="App">
            <TodoList
                title={'What to do'}
                tasks={tasksForRender}
                removeTask={removeTask}
                onClickHandler={onClickHandler}
            />
        </div>
    );
}

export default App;
