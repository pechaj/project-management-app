import { useParams } from "react-router-dom";
import { TaskRow } from "./ProjectBlock";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ProjectDetail(){
    
    const { projectCode } = useParams();

    // console.log("Project code from URL:", projectCode);

    const [project, setProject] = useState();

    useEffect(() => {
        const fetchProject = async () => {
            await axios.get(`/api/Projects/${projectCode}`)
                .then(response => {
                    console.log(response.data);
                    setProject(response.data);
                }).catch(error => {
                    console.error("Error fetching project:", error);
                });
        };

        fetchProject();
    }, [projectCode]);

    if (project === undefined) {
        return (<div className="loader"></div>);
    }

    return (<div className="ProjectDetail">
                <h2>{project.name}</h2>
                <p><b>Notes: </b>{project.notes}</p>
                <p><b>Deleted?</b> {project.deleted ? "Yes" : "No"}</p>
                <div className="TaskList">
                    {(project?.tasks ?? []).map(task => (
                        <TaskRow key={task} taskCode={task} />
                    ))}
                </div>
            </div>)
}
