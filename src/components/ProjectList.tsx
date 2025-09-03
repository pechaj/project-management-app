import { useQuery } from "@tanstack/react-query";
import { Button } from 'react-aria-components';
import "../App.css";
import axios from "axios";
import ProjectBlock from "./ProjectBlock.tsx";

export interface project {
    code: string;
    name: string;
    notes: string;
    deleted: boolean;
    tasks: string[];
}

const getProjects = async () => {
    const response = await axios.get("/api/Projects");
    return response;
}

export default function ProjectList() {

    // Pouzity proxy localhost:7148, kvuli CORS
    const { isPending, isError, data, error, refetch } = useQuery({
        queryKey: ['projects'],
        queryFn: getProjects,
    });

    if (isPending) return (
        <div className="mx-auto">
            <p>Loading...</p>
            <div className="loader"></div>
        </div>
    );

    if (isError) return (
        <div className="mx-auto">
            <span>Error: {error.message}</span>
        </div>
    )

    return (
        <div className="container">
            <Button className="btn btn-secondary" onPress={() => refetch()}>Refetch</Button>
            {data.data.map(project => (
                <ProjectBlock key={project.code} project={project} />
            )
            )}
        </div>
    );
}