import { useQuery } from "@tanstack/react-query";
import { Button, Label } from "react-aria-components";
import "@assets/styles.css";
import type { project } from "@project-types/project.tsx";
import axios from "axios";
import ProjectBlock from "@components/ProjectBlock.tsx";

const getProjects = async () => {
  const response = await axios.get("/api/Projects");
  return response;
};

export default function ProjectList() {
  // Pouzity proxy localhost:7148, kvuli CORS
  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  if (isPending) {
    return (
      <div className="mx-auto">
        <p>Loading...</p>
        <div className="loader" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto">
        <span>Error: {error.message}</span>
      </div>
    );
  }

  return (
    <div className="container">
      <Button className="btn btn-secondary" onPress={() => refetch()}>
        Refetch
      </Button>
      {data.data.length > 0 ? (
        data.data.map((object: project) => <ProjectBlock key={object.code} object={object} />)
      ) : (
        <Label className="mx-auto my-3">No projects found. Create a new one!</Label>
      )}
    </div>
  );
}
