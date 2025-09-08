import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { EditTaskModal } from "./EditTaskModal.tsx";
import { useQuery } from "@tanstack/react-query";
import { Button, DialogTrigger, Modal } from "react-aria-components";
import axios from "axios";
import Task from "../shared/interfaces/ITask.tsx";


const getTask = async (taskCode, projectId) => {
    const response = await axios.get(`http://localhost:5295/api/Tasks/${taskCode}?projectId=${projectId}`);
    return response;
};


export default function TaskDetail() {
    const taskCode = useParams();

    const projectId = useLocation().state?.projectId;

    const [editMode, setEditMode] = useState(false);



    const { isPending, isError, data, error } = useQuery({
        queryKey: ['task', taskCode.taskCode, projectId],
        queryFn: ({ queryKey }) => getTask(queryKey[1], queryKey[2]),
    });

    const task: Task = data?.data;

    if (isPending) return (
        <div className="mx-auto">
            <p>Loading...</p>
            <div className="loader"></div>
        </div>
    );

    if (isError) return (
        <div className="mx-auto">
            <span>Error: {error.message}</span>
        </div>
    )
    const { code, description, deleted, deadline, urgency, place } = task;


    return (
        <div className="container">
            <h2>{code}</h2>
            <p><b>Assigned to:</b> {projectId ?? "Unassigned"}</p>
            <p><b>Notes: </b>{description}</p>
            <p><b>Deleted?</b> {deleted ? "Yes" : "No"}</p>
            <p><b>Deadline:</b> {deadline}</p>
            <p><b>Urgency:</b> {urgency}</p>
            <p><b>Place:</b> {place}</p>

            <DialogTrigger>

                <Button className="btn btn-secondary">Edit Task</Button>
                <Modal isDismissable>
                    <EditTaskModal task={task} />
                </Modal>
            </DialogTrigger>
        </div>
    )
}