import { useLocation, useParams } from "react-router-dom";
import { TaskItem } from "./TaskItem.tsx";
import axios from "axios";
import { useEffect, useState } from "react";
import { EditProjectForm } from "./EditProjectForm.js";
import { TaskBlock } from "./TaskBlock.tsx";
import { Button } from "react-aria-components";

export default function ProjectDetail(props) {

    const project = useLocation().state.project;

    const { code, name, notes, deleted, tasks } = useLocation().state.project;

    const [editMode, setEditMode] = useState(false);

    return (
        <div className="ProjectDetail">
            <h2>{name}</h2>
            <p><b>Notes: </b>{notes}</p>
            <p><b>Deleted?</b> {deleted ? "Yes" : "No"}</p>
            <div className="container bg-dark bg-gradient">
                <TaskBlock tasks={tasks} code={code} />
            </div>
            <div className="text-center py-2">
                <Button className="btn btn-secondary" onClick={() => setEditMode(true)}>Edit Project</Button>
            </div>

            {editMode && (
                <EditProjectForm project={project} onClose={() => setEditMode(false)} />
            )}
        </div>
    )
}
