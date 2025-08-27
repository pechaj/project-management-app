import Dialog from '@mui/material/Dialog';
import axios from 'axios';
import { useState } from "react";

const EditProjectForm = ({ project }) => {
    const [open, setOpen] = useState(true);
    const [name, setName] = useState(project.name);
    const [notes, setNotes] = useState(project.notes);

    // const [form, setForm] = useState({ name : project.name, notes : project.notes });

    const handleClose = () => {
        setOpen(false);
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
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit} id="edit-project-form">
                    <h3>Project editation form</h3>
                    <div>
                        <label htmlFor="code">Code</label>
                        <input type="text" id="code" name="code" value={project.code} disabled />
                    </div>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" value={name} onChange={handleNameChange} />
                    </div>
                    <div>
                        <label htmlFor="notes">Notes</label>
                        <textarea id="notes" name="notes" value={notes} onChange={handleNotesChange} />
                    </div>
                    <div>
                        <label htmlFor="deleted">Deleted</label>
                        <input type="checkbox" id="deleted" name="deleted" checked={project.deleted} disabled />
                    </div>

                    <button type="submit">Save</button>
                </form>
            </Dialog>
        </>
    )
}

export { EditProjectForm };