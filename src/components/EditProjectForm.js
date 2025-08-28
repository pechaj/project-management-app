import Dialog from '@mui/material/Dialog';
import axios from 'axios';
import { useState } from "react";

const EditProjectForm = ({ project, onClose }) => {
    const [open, setOpen] = useState(true);
    const [name, setName] = useState(project.name);
    const [notes, setNotes] = useState(project.notes);

    // const [form, setForm] = useState({ name : project.name, notes : project.notes });

    const handleClose = () => {
        setOpen(false);
        onClose();
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleNotesChange = (event) => {
        setNotes(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        alert("Update request is being sent...");

        const updatedProject = {
            "code" : project.code,
            "name" : name,
            "notes" : notes,
            "deleted" : project.deleted,
            "tasks" : project.tasks,
        };

        await axios.put(`/api/Projects/${project.code}`, updatedProject).then(response => {
            alert("Project updated successfully:", response.data);
        }).catch(error => {
            alert("Error updating project:", error);
        });

        handleClose();
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose} >
                <form className="modal-body" style={{ padding: '20px', width: '500px' }} onSubmit={handleSubmit} id="edit-project-form">
                    <div className="modal-header">
                        <h5 className='modal-title'>Project editation form</h5>
                        <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
                    </div>
                    <div className='m-3'>
                        <label htmlFor="code" className='form-label'>Code</label>
                        <input type="text" id="code" name="code" className='form-control' value={project.code} disabled />
                    </div>
                    <div className='m-3'>
                        <label htmlFor="name" className='form-label'>Name</label>
                        <input type="text" id="name" name="name" className='form-control' value={name} onChange={handleNameChange} />
                    </div>
                    <div className='m-3'>
                        <label htmlFor="notes" className='form-label'>Notes</label>
                        <textarea id="notes" name="notes" className='form-control' value={notes} onChange={handleNotesChange} />
                    </div>
                    <div className='m-3'>
                        <label htmlFor="deleted" className='form-label'>Deleted</label>
                        <input type="checkbox" id="deleted" name="deleted" className='form-check-input' checked={project.deleted} disabled />
                    </div>

                    <button type="submit" className='btn btn-primary'>Save</button>
                </form>
            </Dialog>
        </>
    )
}

export { EditProjectForm };