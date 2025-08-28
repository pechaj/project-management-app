import axios from "axios";
import { useEffect, useState } from "react";
import "../App.css";

import ProjectBlock from "./ProjectBlock";

export default function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
        const fetchProjects = async () => {
        const result = await axios.get(`/api/Projects`);
        
        setProjects(result.data);
        setIsLoading(false);
        };

        fetchProjects();
    }, []);

    return (
        <>
            <div className="ProjectList">
                {isLoading ? (
                <div className="loader"></div>
                ) : (
                    projects.map(project => (
                        <ProjectBlock key={project.code} project={project} />
                    ))
                )}
            </div>
        </>
  );
}