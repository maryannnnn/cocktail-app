import './modal.scss'
import React, { ReactNode, FC } from "react";

interface ModalProps {
    modalOpen: boolean;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    children: ReactNode;
}

const Modal: FC<ModalProps> = ({modalOpen, setModalOpen, children}) => {
    return (
        <div className={modalOpen ? "modal active" : "modal"} onClick={() => setModalOpen(false)}>
            <div className={modalOpen ? "modal__content active" : "modal_content"} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Modal;