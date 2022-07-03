import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import style from './Button.module.css';

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
type ButtonPropsType = DefaultButtonPropsType & {
    isActive?: boolean
    removeBtn?: boolean
}

export const Button: React.FC<ButtonPropsType> = ({isActive, removeBtn, className, ...restProps}) => {
    const finalClassName = `${isActive ? style.isActive : ''} ${removeBtn ? style.btnRemove : ''} ${style.stdButton}`;
    return (
        <>
            <button className={finalClassName} {...restProps}></button>
        </>
    );
};