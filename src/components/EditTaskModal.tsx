import { Dialog } from 'react-aria-components';
import { EditTaskForm } from './EditTaskComponents.tsx';


const EditTaskModal = ({ task }) => {


    return (
        <Dialog role='dialog'>
            <EditTaskForm task={task} />
        </Dialog>
    )
}

export { EditTaskModal };