import { Dialog } from "@mui/material";
import axios from 'axios';
import { useState } from "react";
import { useLocation } from "react-router";

export default function NewTaskForm() {
    let data = useLocation();
    const projectCode = data.state.projectCode;
    const [sent, setSent] = useState(false);
    const [form, setForm] = useState({
        code: "",
        projectId: projectCode,
        description: "",
        deadline: "",
        urgency: "",
        place: "",
        deleted: false,
    });
    

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.id] : event.target.value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        alert("Update request is being sent...");

        const newTask = {
            "code" : form?.code ?? "",
            "projectId" : form?.projectId ?? "",
            "description" : form?.description ?? "",
            "deadline" : form?.deadline ?? "",
            "urgency" : form?.urgency,
            "place" : form?.place ?? "",
            "deleted" : form?.deleted === "on" ? true : false
        };

        await axios.post(`http://localhost:5295/api/Tasks`, newTask)
            .then(response => {
                alert("Task added successfully!");
            })
            .catch(error => {
                console.log(error);
            });

        setSent(true);

        setForm({
            code: "",
            projectId: projectCode,
            description: "",
            deadline: "",
            urgency: "",
            place: "",
            deleted: false,
        });
    }

    return (
        <>
        {(sent) ? <Dialog open={sent} className='modal' onClose={() => setSent(false)}>
            <div className='modal-title'>Task added successfully!</div>
        </Dialog> : (
            <div className='container mx-auto w-50'>
                <form className="m-5" onSubmit={handleSubmit} id="new-task-form">
                        <div className="form-group">
                            <h5 className=''>New task form</h5>
                        </div>
                        <div className='m-3'>
                            <label htmlFor="code" className='form-label'>Code</label>
                            <input type="text" id="code" name="code" className='form-control' value={form.code} onChange={handleChange} required/>
                        </div>
                        <div className='m-3'>
                            <label htmlFor="project-id" className='form-label'>Project ID</label>
                            <input type="text" id="project-id" name="project-id" className='form-control' value={form.projectId} onChange={handleChange} />
                        </div>
                        <div className='m-3'>
                            <label htmlFor="description" className='form-label'>Description</label>
                            <textarea id="description" name="description" className='form-control' value={form.description} onChange={handleChange} />
                        </div>
                        <div className='m-3'>
                            <label htmlFor="deadline" className='form-label'>Deadline</label>
                            <input type="date" id="deadline" name="deadline" className='form-control' value={form.deadline} onChange={handleChange} />
                        </div>
                        <div className='m-3'>
                            <label htmlFor="urgency" className='form-label'>Urgency</label>
                            <select id="urgency" name="urgency" className='form-control' value={form.urgency} onChange={handleChange}> 
                                <option value="4 - Low">4 - Low</option>
                                <option value="3 - Medium">3 - Medium</option>
                                <option value="2 - High">2 - High</option>
                                <option value="1 - Critical">1 - Critical</option>
                            </select>
                        </div>
                        <div className='m-3'>
                            <label htmlFor="place" className='form-label'>Place</label>
                            <input id="place" name="place" className='form-control' value={form.place} onChange={handleChange} />
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