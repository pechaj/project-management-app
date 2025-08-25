import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


export default function TaskDetail() {
    const { taskCode } = useParams();

    const [task, setTask] = useState();

    useEffect(() => {
        const fetchTask = async () => {
            await axios.get(`/api/Tasks/${taskCode}`)
                .then(response => {
                    console.log(response.data);
                    setTask(response.data);
                }).catch(error => {
                    console.error("Error fetching task:", error);
                });
        };

        fetchTask();
    }, [taskCode]);

    if (task === undefined) {
        return (<div className="loader"></div>);
    }

    return (<div className="TaskDetail">
                    <h2>{task.code}</h2>
                    <p><b>Assigned to:</b> {task.projectId ?? "Unassigned"}</p>
                    <p><b>Notes: </b>{task.descriptions}</p>
                    <p><b>Deleted?</b> {task.deleted ? "Yes" : "No"}</p>
                    <p><b>Deadline:</b> {task.deadline}</p>
                    <p><b>Urgency:</b> {task.urgency}</p>
                    <p><b>Place:</b> {task.place}</p>
                    
                    
                </div>)
}