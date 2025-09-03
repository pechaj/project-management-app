import { useState } from "react";
import { Button } from "react-aria-components";

export function ModalHeader({ title, handleClose }: { title: string, open: boolean, handleClose }) {

    return (
        <div className="modal-header">
            <h5 className='modal-title'>{title}</h5>
            <Button type="button" className="btn-close" onPress={handleClose} aria-label="Close" />
        </div>
    )
}