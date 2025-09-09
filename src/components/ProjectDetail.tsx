import { Button, DialogTrigger, Modal } from "react-aria-components";
import { useLocation } from "react-router-dom";
import { EditProjectModal } from "@components/EditProjectModal";
import { TaskBlock } from "@components/TaskBlock";

export default function ProjectDetail() {
  const project = useLocation().state.project;

  const { code, name, notes, deleted, tasks } = useLocation().state.project;

  return (
    <div className="container">
      <h2>{name}</h2>
      <p>
        <b>Notes: </b>
        {notes}
      </p>
      <p>
        <b>Deleted?</b> {deleted ? "Yes" : "No"}
      </p>
      <div className="container bg-dark bg-gradient">
        <TaskBlock code={code} tasks={tasks} />
      </div>
      <DialogTrigger>
        {/* TODO: rework this section*/}
        <Button className="btn btn-secondary">Edit Project</Button>
        <Modal isDismissable>
          <EditProjectModal object={project} />
        </Modal>
      </DialogTrigger>
    </div>
  );
}
