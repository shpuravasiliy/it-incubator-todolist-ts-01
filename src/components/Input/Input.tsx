import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from 'react';
import style from './Input.module.css';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type InputPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
}

export const Input: React.FC<InputPropsType> = (
    {
        type,
        onChange, onChangeText,
        onKeyDown, onEnter,
        error,
        className, spanClassName,
        ...restProps
    }
) => {

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e);
        onChangeText && onChangeText(e.currentTarget.value);
    }
    const onKeyDownCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyDown && onKeyDown(e);
        onEnter && e.key === 'Enter' && onEnter();
    }

    const finalInputClassName = `${error ? style.errorBorder : ''} ${className ? className : style.stdInput}`
    const finalSpanClassName = `${error ? style.errorInput : ''} ${spanClassName ? spanClassName : ''}`

    return (
        <>
            <input
                type={'text'}
                onChange={onChangeCallback}
                onKeyDown={onKeyDownCallback}
                className={finalInputClassName}
                {...restProps}
            />
            {error && <span className={finalSpanClassName}>{error}</span>}
        </>
    );
};