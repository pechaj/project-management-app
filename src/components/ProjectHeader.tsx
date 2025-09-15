import type { project } from "@project-types/project";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteButton from "@components/DeleteButton";

const deleteProject = async (projectCode: string, deleted: boolean) => {
  // TODO: Redo this section using useMutation
  await axios
    .delete(`/api/Projects/${projectCode}/delete`)
    .then(() => {
      if (deleted) {
        alert("Project marked as restored successfully`)");
      } else {
        alert("Project marked as deleted successfully");
      }
      return true;
    })
    .catch((error) => {
      console.error("Error deleting project:", error);
      return false;
    });
  return true;
};

function ProjectHeader({ object }: { object: project }) {
  const { code, name, deleted } = object;

  const { isFetching, refetch } = useQuery({
    queryKey: ["delete-project", code],
    queryFn: () => deleteProject(code, deleted),
    enabled: false,
  });

  return (
    <div className="row">
      <Link
        className="h4 link-offset-2 link-underline link-underline-opacity-0 col-11"
        state={{ object }}
        to={`/projects/${code}`}
      >
        {name} ({code})
      </Link>
      <DeleteButton deleted={deleted} isFetching={isFetching} refetch={refetch} />
    </div>
  );
}

export default ProjectHeader;
