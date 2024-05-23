import './select.scss'
import React from 'react';

interface SelectProps {
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    options: {
        value: string;
        label: string;
    }[];
}

const Select: React.FC<SelectProps> = ({ name, value, onChange, options }) => {
    return (
        <select
            name={name}
            value={value}
            onChange={onChange}
        >
            {options.map((e) => (
                <option value={e.value} key={e.label}>
                    {e.label}
                </option>
            ))}
        </select>
    );
};

export default Select;
