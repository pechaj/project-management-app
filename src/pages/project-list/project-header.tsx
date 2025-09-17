import type { project } from "@project-types/project";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { DeleteButton } from "@pages/project-list/delete-button";
import { queue } from "@/app";

export function ProjectHeader({ object }: { object: project }) {
  const { code, name, deleted } = object;

  const deleteProject = async () => {
    await axios.delete(`/api/Projects/${code}/delete`);

    queue.add({
      title: "New notification!",
      description: `Project ${code} marked as ${deleted ? "restored" : "deleted"}`,
    });
  };

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  const deleteMutation = useMutation({
    mutationKey: ["mark-as-deleted"],
    mutationFn: deleteProject,
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
      <DeleteButton deleted={deleted} handleDelete={handleDelete} isFetching={deleteMutation.isPending} />
    </div>
  );
}
