import type { task } from "@project-types/task.tsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button, DialogTrigger, Modal, ProgressBar } from "react-aria-components";
import { useLocation, useParams } from "react-router-dom";
import { EditTaskModal } from "@components/EditTaskModal.tsx";

const getTask = async (taskCode: string, projectId: string) => {
  const response = await axios.get(`http://localhost:5295/api/Tasks/${taskCode}?projectId=${projectId}`);
  return response;
};

export default function TaskDetail() {
  const taskCode = useParams().taskCode;

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

  if (deleteMutation.isPending) {
    return (
      <div className="m-3">
        <ProgressBar aria-label="Saving..." className="loader p-3" isIndeterminate />
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const object: task = data.data;

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
  const { code, description, deleted, deadline, urgency, place } = object;

  return (
    <div className="container">
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
        <Button className="btn btn-secondary">Edit Task</Button>
        {/* TODO: fix the modal not showing up in front of the detail */}
        <Modal className="container">
          <EditTaskModal object={object} />
        </Modal>
      </DialogTrigger>
      <Button className="btn btn-danger m-2" onPress={handleDelete}>
        Delete Task
      </Button>
    </div>
  );
}
