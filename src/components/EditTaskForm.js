import Dialog from '@mui/material/Dialog';
import axios from 'axios';
import { useState } from "react";

const EditTaskForm = ({ task, onClose }) => {
    const [open, setOpen] = useState(true);

    const [form, setForm] = useState({
        description : task.description,
        deadline : task.deadline,
        urgency : task.urgency,
        place : task.place
    });

    const handleClose = () => {
        setOpen(false);
        onClose();
    };

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.id]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        alert("Update request is being sent...");

        const updatedTask = {
            "description" : form.description,
            "deadline" : form.deadline,
            "urgency" : form.urgency,
            "place" : form.place
        };

        await axios.put(`http://localhost:5295/api/Tasks/${task.code}`, updatedTask).then(response => {
            alert("Task updated successfully:", response.data);
        }).catch(error => {
            alert("Error updating task:", error);
        });

        handleClose();
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose} >
                <form className="modal-body" style={{ padding: '20px', width: '500px' }} onSubmit={handleSubmit} id="edit-task-form">
                    <div className="modal-header">
                        <h5 className='modal-title'>Task editing form</h5>
                        <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
                    </div>
                    <div className='m-3'>
                        <label htmlFor="code" className='form-label'>Code</label>
                        <input type="text" id="code" name="code" className='form-control' value={task.code} disabled />
                    </div>
                    <div className='m-3'>
                        <label htmlFor="description" className='form-label'>Description</label>
                        <input type="text" id="description" name="description" className='form-control' value={form.description} onChange={handleChange} />
                    </div>
                    <div className='m-3'>
                        <label htmlFor="deadline" className='form-label'>Deadline</label>
                        <input type="date" id="deadline" name="deadline" className='form-control' value={form.deadline} onChange={handleChange} />
                    </div>
                    <div className='m-3'>
                        <label htmlFor="urgency" className='form-label'>Urgency</label>
                        <input type="text" id="urgency" name="urgency" className='form-control' value={form.urgency} onChange={handleChange} />
                    </div>
                    <div className='m-3'>
                        <label htmlFor="place" className='form-label'>Place</label>
                        <input type="text" id="place" name="place" className='form-control' value={form.place} onChange={handleChange} />
                    </div>
                    <div className='m-3'>
                        <label htmlFor="deleted" className='form-label'>Deleted</label>
                        <input type="checkbox" id="deleted" name="deleted" className='form-check-input' checked={form.deleted} disabled />
                    </div>

                    <button type="submit" className='btn btn-primary'>Save</button>
                </form>
            </Dialog>
        </>
    )
}

export { EditProjectForm };