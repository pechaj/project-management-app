import axios from "axios";
import { useEffect, useState } from "react";

import ProjectBlock from "./ProjectBlock";

export default function ProjectList() {
    const [projects, setProjects] = useState([]);

    // Sample project data
    /*const projects = [{
        id: 1,
        name: "Project 1",
        description: "Description for Project 1",
        Tasks: [
        { id: 1, name: "Task 1"},
        { id: 2, name: "Task 2"}
        ],
        deleted: false
    }, {
        id: 2,
        name: "Project 2",
        description: "Description for Project 2",
        Tasks: [
        { id: 3, name: "Task 3"}
        ],
        deleted: true
    }];*/

    // Pouzity proxy localhost:7148, kvuli CORS
    useEffect(() => {
        const fetchProjects = async () => {
        const result = await axios(`/api/Projects`);
        
        setProjects(result.data);
        };

        fetchProjects();
    }, []);

    return (
        <>
            <div className="ProjectList">
                {projects.length > 0 ? (
                projects.map(project => (
                    <ProjectBlock key={project.code} project={project} />
                ))
                ) : (
                <p className='no-projects'>No Projects found</p>
                )}
            </div>
        </>
  );
}