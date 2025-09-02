import { useEffect, useState } from "react";
import { 
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
 } from "@tanstack/react-query";
import "../App.css";

import ProjectBlock from "./ProjectBlock";

interface project {
    code: string;
    name: string;
    notes: string;
    deleted: boolean;
}

export default function ProjectList() {
    const [projects, setProjects] = useState<Array<project>>([]);

    // Pouzity proxy localhost:7148, kvuli CORS
    const {isPending, isError, data, error } = useQuery({ queryKey: ['projects'], queryFn: fetchProjects})

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
        <>
            {projects.map(project => ( 
                <ProjectBlock key={project.code} project={project} />
            )
            )};
        </>
        );
}