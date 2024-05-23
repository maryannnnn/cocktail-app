import './button.scss'
import React, { FC, ReactNode } from "react";
import './media.scss'

interface ButtonProps {
    className: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children: ReactNode;
}

const Button: FC<ButtonProps> = ({ className, onClick, children }) => {
    return (
        <button className={className}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button
