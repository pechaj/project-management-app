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

    const [sent, setSent] = useState(false);

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.id]: event.target.value
        });
    };
        
    const handleSubmit = (event) => {
        event.preventDefault();
        setSent(false);

        alert("Update request is being sent...");

        const newProject = {
            "code" : form?.code ?? "",
            "name" : form?.name ?? "",
            "notes" : form?.notes ?? "",
            "deleted" : form?.deleted === "on" ? true : false
        };

        axios.post(`/api/Projects`, newProject)
            .then(response => {
                alert("Project added successfully!");
            })
            .catch(error => {
                console.log(error);
            });

        setSent(true);

        setForm({
            code: "",
            name: "",
            notes: "",
            deleted: false
        });

    };

    return (
        <> {(sent) ? <Dialog open={sent} className='modal' onClose={() => setSent(false)}>
            <div className='modal-title'>Project added successfully!</div>
        </Dialog> : (
            <div className='container mx-auto'>
                <form className="m-5" onSubmit={handleSubmit} id="new-project-form">
                        <div className="form-group">
                            <h5 className=''>New project form</h5>
                        </div>
                        <div className='m-3'>
                            <label htmlFor="code" className='form-label'>Code</label>
                            <input type="text" id="code" name="code" className='form-control' value={form.code} onChange={handleChange} required/>
                        </div>
                        <div className='m-3'>
                            <label htmlFor="name" className='form-label'>Name</label>
                            <input type="text" id="name" name="name" className='form-control' value={form.name} onChange={handleChange} />
                        </div>
                        <div className='m-3'>
                            <label htmlFor="notes" className='form-label'>Notes</label>
                            <textarea id="notes" name="notes" className='form-control' value={form.notes} onChange={handleChange} />
                        </div>
                        <div className='m-3'>
                            <label htmlFor="deleted" className='form-label'>Deleted</label>
                            <input type="checkbox" id="deleted" name="deleted" className='form-check-input' checked={form.deleted} onChange={handleChange} />
                        </div>

                        <button type="submit" className='btn btn-success'>Save</button>
                    </form>
            </div>
        )}
        </>
    )
}