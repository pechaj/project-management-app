import { useLocation, useParams } from "react-router-dom";
import { TaskItem } from "./TaskItem.tsx";
import axios from "axios";
import { useEffect, useState } from "react";
import { EditProjectForm } from "./EditProjectForm.js";

export default function ProjectDetail(props) {

    const project = useLocation().state.project;

    const [code, name, notes, deleted, tasks] = useLocation().state.project;

    const [editMode, setEditMode] = useState(false);

    return (
        <div className="ProjectDetail">
            <h2>{name}</h2>
            <p><b>Notes: </b>{notes}</p>
            <p><b>Deleted?</b> {deleted ? "Yes" : "No"}</p>
            <div className="TaskList">
                {tasks?.map(task => (
                    <TaskItem key={task} taskCode={task} projectId={code} />
                ))}
            </div>
            <div>
                <button onClick={() => setEditMode(true)}>Edit Project</button>
            </div>

            {editMode && (
                <EditProjectForm project={project} onClose={() => setEditMode(false)} />
            )}
        </div>
    )
}
