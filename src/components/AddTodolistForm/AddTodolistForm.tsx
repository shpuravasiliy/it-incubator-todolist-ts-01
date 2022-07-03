import React from 'react';
import style from './AddTodolistForm.module.css'
import {MyInput} from '../MyInput/MyInput';

type AddTodolistFormPropsType = {
    callBackHandler: (newTitle: string) => void
}

export const AddTodolistForm: React.FC<AddTodolistFormPropsType> = (props) => {

    return (
        <div className={style.main}>
            <h3>Add new Todolist</h3>
            <MyInput
                btnTitle={'+'}
                placeholder={'Type new Todolist title'}
                callBack={props.callBackHandler}
            />
        </div>
    );
};