import React, {useState} from 'react';
import style from '../TodoList/TodoList.module.css';
import {Button} from '../Button/Button';
import {Input} from '../Input/Input';

type MyInputPropsType = {
    btnTitle: string
    placeholder: string
    callBack: (title: string) => void
}

export const MyInput: React.FC<MyInputPropsType> = (props) => {

    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const callBackHandler = () => {
        if (value.trim()) {
            props.callBack(value);
        } else {
            !error && setError('Title is required');
        }
        setValue('');
    };
    const onChangeHandler = (newValue: string) => {
        error && setError(null);
        setValue(newValue);
    };
    const onKeydownHandler = () => {
            callBackHandler();
    };

    return (
        <div className={style.inputBlock}>
            <Input
                value={value}
                placeholder={props.placeholder}
                onChangeText={onChangeHandler}
                onEnter={onKeydownHandler}
                className={error ? style.errorInput : ''}
                />
            {/*<input*/}
            {/*    value={value}*/}
            {/*    placeholder="Enter new task"*/}
            {/*    onChange={onChangeHandler}*/}
            {/*    onKeyDown={onKeydownHandler}*/}
            {/*    className={error ? style.errorInput : ''}*/}
            {/*/>*/}
            <Button onClick={callBackHandler} children={props.btnTitle}/>
            <div className={style.errorText}>{error ? 'Title is required' : ''}</div>
        </div>
    );
};