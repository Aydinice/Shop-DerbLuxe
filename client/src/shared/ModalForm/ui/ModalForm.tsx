import React, { ReactNode } from "react";
import "./ModalForm.scss";

interface ModalFormProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalForm(props: ModalFormProps) {
  const { children, isOpen, onClose } = props;

  if (!isOpen) {
    return;
  }

  return (
    <div onClick={onClose} className="ModalForm">
      <div onClick={(e) => e.stopPropagation()} className="ContentModalForm">
        {children}
      </div>
    </div>
  );
}
