import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import DeleteButton from "./DeleteButton.tsx";
import { project } from "./ProjectList.tsx";

const deleteProject = async (projectCode: string, deleted: boolean) => {
    await axios.delete(`/api/Projects/${projectCode}/delete`).then(response => {
        if (!deleted) {
            alert(`Project marked as deleted successfully`);
        } else {
            alert("Project marked as restored successfully`)");
        }
        return true;
    }).catch(error => {
        console.error("Error deleting project:", error);
        return false;
    });
    return true;
}

function ProjectHeader({ projectCode, projectName, deleted, project }: { projectCode: string, projectName: string, deleted: boolean, project: project }) {

    const { isFetching, isError, refetch } = useQuery({
        queryKey: ["delete-project", projectCode],
        queryFn: () => deleteProject(projectCode, deleted),
        enabled: false,
    });

    return (
        <div className="row">
            <Link className="col-11 h4 link-offset-2 link-underline link-underline-opacity-0"
                to={`/projects/${projectCode}`} state={{ project: project }}>{projectName} ({projectCode})</Link>

            <DeleteButton isFetching={isFetching} deleted={deleted} refetch={refetch} />
        </div>
    )
}

export default ProjectHeader;