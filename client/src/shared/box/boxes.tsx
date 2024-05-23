import toast, { Toaster } from 'react-hot-toast'
import './boxes.scss'
import React, { FC, ReactNode } from "react";

interface MessageBoxProps {
    variant: string;
    children: ReactNode;
}

export const MessageBox: FC<MessageBoxProps> = ({ variant, children }) => {
    const content = <div>{children}</div>;

    switch (variant) {
        case "errorVariant":
            toast.error(content);
            break;
        case "successVariant":
            toast.success(content);
            break;
        case "customVariant":
            toast.custom(content);
            break;
        case "loadingVariant":
            toast.loading(content);
            break;
        default:
            break;
    }

    return (
        <div>
            <Toaster />
        </div>
    );
};



export const LoadingBox: FC = () => {
  return (
    <div className="loading">
     
    </div>
  )
}