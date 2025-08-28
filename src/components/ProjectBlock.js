import { Link } from "react-router-dom";

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
    // TODO: tahle komponenta se vola moc casto
    console.log("Rendering ProjectBlock for project:", project);
    return (
        <div className={"ProjectCard card" + (project?.deleted ? " deleted" : "")}>
            <Link className="h4 link-offset-2 link-underline link-underline-opacity-0" 
                to={`/projects/${project?.code}`}>{project?.name} ({project?.code})</Link>
            <div className="TaskList list-group list-group-flush p-3">
                {(project?.tasks ?? []).map(task => (
                    <TaskRow key={task} taskCode={task} projectId={project.code} />
                ))}
            </div>
        </div>
    )
}