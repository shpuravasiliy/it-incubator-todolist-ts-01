import React, {useState} from 'react';
import {Input} from '../Input/Input';
import style from './EditableSpan.module.css';

type EditableSpanPropsType = {
    title: string
    isDone?: boolean
    editedInputValue: (newValue: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [newValue, setNewValue] = useState(props.title);

    const editCallback = () => {
        setEdit(!edit);
    }
    const onBlurHandler = () => {
        props.editedInputValue(newValue);
        editCallback();
    }

    return (
        edit
            ?
            <Input
                value={newValue}
                onChangeText={setNewValue}
                onBlur={onBlurHandler}
            />
            :
            <span
                className={props.isDone ? style.isDone : ''}
                onDoubleClick={editCallback}
            >{props.title}</span>
    );
};