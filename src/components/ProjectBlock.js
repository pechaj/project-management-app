import { Link } from "react-router-dom";

export function TaskRow({ taskCode }) {
    return (
        <button className="TaskCard">
            <Link to={`/tasks/${taskCode}`}>
                <div>
                    <h3>{taskCode}</h3>
                </div>
            </Link>
        </button>
    )
}

export default function ProjectBlock({ project }) {
    // TODO: tahle komponenta se vola moc casto
    console.log("Rendering ProjectBlock for project:", project);
    return (
        <div className={"ProjectCard" + (project?.deleted ? " deleted" : "")}>
            <h2><Link to={`/projects/${project?.code}`}>{project?.name} ({project?.code})</Link></h2>
            <div className="TaskList">
                {(project?.tasks ?? []).map(task => (
                    <TaskRow key={task} taskCode={task} />
                ))}
            </div>
        </div>
    )
}