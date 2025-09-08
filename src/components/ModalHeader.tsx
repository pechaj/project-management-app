import { useState } from "react";
import { Button, Heading } from "react-aria-components";

export function ModalHeader({ title }: { title: string }) {

    return (
        <div className="modal-header mt-2">
            <Heading slot="title" className='modal-title'>{title}</Heading>
            <Button slot="close" className="btn-close" aria-label="Close" />
        </div>
    )
}