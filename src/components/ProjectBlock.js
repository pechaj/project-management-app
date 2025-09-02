import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export function TaskRow({ taskCode, projectId }) {
    return (
        <button className="m-2">
            <Link className="list-group-item list-group-item-action h5" to={`/tasks/${taskCode}`} state={{ projectId : projectId }}>
                <p>{taskCode}</p>
            </Link>
        </button>
    )
}

export default function ProjectBlock({ project }) {

    const [projectInfo, setProjectInfo] = useState(project);

    const handleDelete = async ( code ) => {
        
        await axios.delete(`/api/Projects/${code}/delete`).then(response => {
            setProjectInfo({
                ...projectInfo,
                deleted: !projectInfo.deleted
            });
            alert(`${response.status} : Project deleted successfully`);
        }).catch(error => {
            console.error("Error deleting project:", error);
        });
    }

    // console.log("Rendering ProjectBlock for project:", project);
    return (
        <div className={"ProjectCard card" + (project?.deleted ? " deleted" : "")}>
            <div className="row">
                <Link className="col-9 h4 link-offset-2 link-underline link-underline-opacity-0" 
                    to={`/projects/${project?.code}`}>{project?.name} ({project?.code})</Link>
                <button className="col-1" onClick={() => {handleDelete(project?.code)}}>
                    {project?.deleted ? (
                        <i title="Restore project" className="bi bi-check-circle"></i>
                    ) : (
                        <i title="Mark as deleted" className="bi bi-x-circle"></i>
                    )}  
                </button>
            </div>

            <div className="TaskList list-group list-group-flush p-3">
                {(project?.tasks ?? []).map(task => (
                    <TaskRow key={task} taskCode={task} projectId={project.code} />
                ))}
                <div>
                    <Link className="btn btn-success" to={`/tasks/new`} state={{ projectId : project?.code }}>
                        +
                    </Link>
                </div>
            </div>
        </div>
    )
}