import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { EditTaskForm } from "./EditTaskForm";
import axios from "axios";


export default function TaskDetail() {
    const { taskCode } = useParams();

    const projectId = useLocation().state?.projectId;

    const [editMode, setEditMode] = useState(false);
    const [task, setTask] = useState();

    useEffect(() => {
        const fetchTask = async () => {
            await axios.get(`http://localhost:5295/api/Tasks/${taskCode}?projectId=${projectId}`)
                .then(response => {
                    console.log(response.data);
                    setTask(response.data);
                }).catch(error => {
                    console.error("Error fetching task:", error);
                });
        };

        fetchTask();
    }, [taskCode, projectId]);

    if (task === undefined) {
        return (<div className="loader"></div>);
    }

    return (
        <div className="TaskDetail">
            <h2>{task.code}</h2>
            <p><b>Assigned to:</b> {task.projectId ?? "Unassigned"}</p>
            <p><b>Notes: </b>{task.description}</p>
            <p><b>Deleted?</b> {task.deleted ? "Yes" : "No"}</p>
            <p><b>Deadline:</b> {task.deadLine}</p>
            <p><b>Urgency:</b> {task.urgency}</p>
            <p><b>Place:</b> {task.place}</p>

            <div>
                <button onClick={() => setEditMode(true)}>Edit Task</button>
            </div>

            {editMode && (
                <EditTaskForm task={task} onClose={() => setEditMode(false)} /> 
            )}
        </div>
        )
}