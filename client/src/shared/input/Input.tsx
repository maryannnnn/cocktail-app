import './input.scss';
import React, { FC, ChangeEvent } from "react";

interface InputProps {
    type: string;
    name: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    value: string;
    placeholder: string;
}

const Input: FC<InputProps> = ({ type, name, onChange, value, placeholder }) => {
    return (
        <input
            type={type}
            name={name}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
        />
    );
}

export default Input;