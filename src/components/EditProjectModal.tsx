import { Dialog } from 'react-aria-components';
import { useState } from "react";
import { EditProjectForm } from './EditProjectComponents.tsx';


const EditProjectModal = ({ project, onClose }) => {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
        onClose();
    };
    // TODO: rework this, very buggy, modal not working like modal, maybe delete onClose?
    return (
        <>
            <Dialog>
                <EditProjectForm project={project} open={open} handleClose={handleClose} />
            </Dialog>
        </>
    )
}

export { EditProjectModal };