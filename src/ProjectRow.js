import "./App.css";

function TaskRow({ taskCode }) {
    return (
        <button className="TaskCard">
            <div>
                <h3>{taskCode}</h3>
            </div>
        </button>
    )
}

function ProjectRow({ project }) {
    return (
        <div className={"ProjectCard" + (project.deleted ? " deleted" : "")}>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <div className="TaskList">
            {project.tasks.map(task => (
                <TaskRow key={task} taskCode={task} />
            ))}
            </div>
        </div>
    )
}

export default ProjectRow;