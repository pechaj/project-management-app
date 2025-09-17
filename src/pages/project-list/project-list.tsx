import { useQuery } from "@tanstack/react-query";
import { Button, Label } from "react-aria-components";
import "@assets/styles.css";
import type { project } from "@project-types/project.tsx";
import axios from "axios";
import { ProjectBlock } from "@pages/project-list/project-block";
import { LoadingIcon } from "@/components/loading-icon";

const getProjects = async () => {
  const response = await axios.get("/api/Projects");
  return response;
};

export function ProjectList() {
  // Pouzity proxy localhost:7148, kvuli CORS
  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  if (isPending) {
    return (
      <div className="secondary-font-color py-2 text-center">
        <Label className="fs-2 my-3">Fetching...</Label>
        <LoadingIcon />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="secondary-font-color py-2 text-center">
        <Label className="fs-2 my-3">Error: {error.message}</Label>
        <br />
        <Button className="btn btn-secondary" onPress={() => refetch()}>
          Refetch
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-2">
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
