import { useState } from "react";
import { Dialog } from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router";

export default function NewTaskForm() {
  const data = useLocation();
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
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    alert("Update request is being sent...");

    const newTask = {
      code: form?.code ?? "",
      projectId: form?.projectId ?? "",
      description: form?.description ?? "",
      deadline: form?.deadline ?? "",
      urgency: form?.urgency,
      place: form?.place ?? "",
      deleted: form?.deleted === "on" ? true : false,
    };

    await axios
      .post("http://localhost:5295/api/Tasks", newTask)
      .then((response) => {
        alert("Task added successfully!");
      })
      .catch((error) => {
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
  };

  return (
    <>
      {sent ? (
        <Dialog className="modal" onClose={() => setSent(false)} open={sent}>
          <div className="modal-title">Task added successfully!</div>
        </Dialog>
      ) : (
        <div className="container mx-auto w-50">
          <form className="m-5" id="new-task-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <h5 className="">New task form</h5>
            </div>
            <div className="m-3">
              <label className="form-label" htmlFor="code">
                Code
              </label>
              <input
                className="form-control"
                id="code"
                name="code"
                onChange={handleChange}
                required
                type="text"
                value={form.code}
              />
            </div>
            <div className="m-3">
              <label className="form-label" htmlFor="project-id">
                Project ID
              </label>
              <input
                className="form-control"
                id="project-id"
                name="project-id"
                onChange={handleChange}
                type="text"
                value={form.projectId}
              />
            </div>
            <div className="m-3">
              <label className="form-label" htmlFor="description">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                onChange={handleChange}
                value={form.description}
              />
            </div>
            <div className="m-3">
              <label className="form-label" htmlFor="deadline">
                Deadline
              </label>
              <input
                className="form-control"
                id="deadline"
                name="deadline"
                onChange={handleChange}
                type="date"
                value={form.deadline}
              />
            </div>
            <div className="m-3">
              <label className="form-label" htmlFor="urgency">
                Urgency
              </label>
              <select className="form-control" id="urgency" name="urgency" onChange={handleChange} value={form.urgency}>
                <option value="4 - Low">4 - Low</option>
                <option value="3 - Medium">3 - Medium</option>
                <option value="2 - High">2 - High</option>
                <option value="1 - Critical">1 - Critical</option>
              </select>
            </div>
            <div className="m-3">
              <label className="form-label" htmlFor="place">
                Place
              </label>
              <input className="form-control" id="place" name="place" onChange={handleChange} value={form.place} />
            </div>
            <div className="m-3">
              <label className="form-label" htmlFor="deleted">
                Deleted
              </label>
              <input
                checked={form.deleted}
                className="form-check-input"
                id="deleted"
                name="deleted"
                onChange={handleChange}
                type="checkbox"
              />
            </div>

            <button className="btn btn-success" type="submit">
              Save
            </button>
          </form>
        </div>
      )}
    </>
  );
}
