import { Dialog } from 'react-aria-components';
import { useState } from "react";
import { EditProjectForm } from './EditProjectComponents.tsx';


const EditProjectModal = ({ project }) => {

    // TODO: rework this, very buggy, modal not working like modal, maybe delete onClose?
    return (
        <Dialog role='dialog'>
            <EditProjectForm project={project} />
        </Dialog>
    )
}

export { EditProjectModal };