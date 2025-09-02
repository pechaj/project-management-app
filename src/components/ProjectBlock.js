import { Link } from "react-router-dom";
import { useState } from "react";
import ProjectHeader from "./ProjectHeader.tsx";
import axios from "axios";

export function TaskRow({ taskCode, projectId }) {
    return (
        <button className="m-2">
            <Link className="list-group-item list-group-item-action h5" to={`/tasks/${taskCode}`} state={{ projectId: projectId }}>
                <p>{taskCode}</p>
            </Link>
        </button>
    )
}

export default function ProjectBlock({ project }) {
    const { code, name, tasks, deleted } = project;

    // console.log("Rendering ProjectBlock for project:", project);
    return (
        <div className={"ProjectCard card" + (deleted ? " deleted" : "")}>
            <ProjectHeader projectCode={code} projectName={name} deleted={deleted} />

            <div className="TaskList list-group list-group-flush p-3">
                {tasks?.map(task => (
                    <TaskRow key={task} taskCode={task} projectId={code} />
                ))}
                <div>
                    <Link className="btn btn-success" to={`/tasks/new`} state={{ projectCode: code }}>
                        +
                    </Link>
                </div>
            </div>
        </div>
    )
}