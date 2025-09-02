import Dialog from '@mui/material/Dialog';
import axios from 'axios';
import { useState } from "react";

export default function NewProjectForm() {
    const [form, setForm] = useState({
            code : "",
            name : "",
            notes : "",
            deleted : false
        });

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.id]: event.target.value
        });
    };
        
    const handleSubmit = (event) => {
        event.preventDefault();

        alert("Update request is being sent...");

        const newProject = {
            "code" : form?.code ?? "",
            "name" : form?.name ?? "",
            "notes" : form?.notes ?? "",
            "deleted" : form?.deleted == "on" ? true : false
        };

        axios.post(`/api/Projects`, newProject)
            .then(response => {
                alert("Project added successfully!");
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className='container mx-auto'>
            <form className="m-5" onSubmit={handleSubmit} id="edit-project-form">
                    <div className="form-group">
                        <h5 className=''>Project editation form</h5>
                    </div>
                    <div className='m-3'>
                        <label htmlFor="code" className='form-label'>Code</label>
                        <input type="text" id="code" name="code" className='form-control' onChange={handleChange} />
                    </div>
                    <div className='m-3'>
                        <label htmlFor="name" className='form-label'>Name</label>
                        <input type="text" id="name" name="name" className='form-control' onChange={handleChange} />
                    </div>
                    <div className='m-3'>
                        <label htmlFor="notes" className='form-label'>Notes</label>
                        <textarea id="notes" name="notes" className='form-control' onChange={handleChange} />
                    </div>
                    <div className='m-3'>
                        <label htmlFor="deleted" className='form-label'>Deleted</label>
                        <input type="checkbox" id="deleted" name="deleted" className='form-check-input' onChange={handleChange} />
                    </div>

                    <button type="submit" className='btn btn-success'>Save</button>
                </form>
        </div>
    )
}