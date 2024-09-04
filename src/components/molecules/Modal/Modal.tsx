import React from "react"
import { ModalProps } from "./Modal.model"

export const Modal: React.FC<ModalProps> = ({ header, children }) => {
    return <>
        <h1><b>Header</b></h1>
        {children}
    </>
}