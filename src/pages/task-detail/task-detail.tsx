import type { task } from "@project-types/task.tsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button, DialogTrigger, Modal } from "react-aria-components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { EditTaskModal } from "@pages/task-detail/edit-task-modal";
import { LoadingIcon } from "@/components/loading-icon";

const getTask = async (taskCode: string, projectId: string) => {
  const response = await axios.get(`http://localhost:5295/api/Tasks/${taskCode}?projectId=${projectId}`);
  return response;
};

export function TaskDetail() {
  const navigate = useNavigate();

  const taskCode = useLocation().state?.taskCode;

  const projectId = useLocation().state?.projectId;

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["task", taskCode, projectId],
    queryFn: ({ queryKey }) => getTask(queryKey[1], queryKey[2]),
  });

  const deleteTask = async () => {
    const response = await axios.delete(`http://localhost:5295/api/Tasks/${taskCode}/delete?projectCode=${projectId}`);
    return response;
  };

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  const deleteMutation = useMutation({
    mutationKey: ["deleteTask"],
    mutationFn: deleteTask,
  });

  if (!useLocation().state) {
    return (
      <div className="secondary-font-color mx-auto">
        <span>False redirect.</span>
      </div>
    );
  }

  if (deleteMutation.isPending) {
    return (
      <div className="m-3">
        <LoadingIcon />
      </div>
    );
  }

  if (!data) {
    navigate("/projects");
    return null;
  }

  const object: task = data.data;

  if (isPending) {
    return (
      <div className="mx-auto">
        <p className="secondary-font-color">Loading...</p>
        <LoadingIcon />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="secondary-font-color mx-auto">
        <span>Error: {error.message}</span>
      </div>
    );
  }
  const { code, description, deleted, deadline, urgency, place } = object;

  return (
    <div className="secondary-font-color container mx-3 w-50 border border-3 border-warning-subtle bg-dark py-3">
      <h2>{code}</h2>
      <p>
        <b>Assigned to:</b> {projectId ?? "Unassigned"}
      </p>
      <p>
        <b>Notes: </b>
        {description}
      </p>
      <p>
        <b>Deleted?</b> {deleted ? "Yes" : "No"}
      </p>
      <p>
        <b>Deadline:</b> {deadline}
      </p>
      <p>
        <b>Urgency:</b> {urgency}
      </p>
      <p>
        <b>Place:</b> {place}
      </p>

      <DialogTrigger>
        <Button className="btn btn-outline-secondary secondary-font-color">Edit Task</Button>
        <Modal isDismissable>
          <EditTaskModal object={object} />
        </Modal>
      </DialogTrigger>
      <Button className="btn btn-outline-danger secondary-font-color m-2" onPress={handleDelete}>
        Delete Task
      </Button>
    </div>
  );
}
