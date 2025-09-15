import { Button, DialogTrigger, Modal } from "react-aria-components";
import { useLocation } from "react-router-dom";
import { EditProjectModal } from "@components/EditProjectModal";
import { TaskBlock } from "@components/TaskBlock";
import type { project } from "@/project-types/project";

export default function ProjectDetail() {
  const object: project = useLocation().state.object;

  const { code, name, notes, deleted, tasks } = object;

  return (
    <div className="secondary-font-color container p-3">
      <h2 className="fw-bold">{name}</h2>
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
        <Button className="btn btn-dark secondary-font-color">Edit Project</Button>
        <Modal isDismissable>
          <EditProjectModal object={object} />
        </Modal>
      </DialogTrigger>
    </div>
  );
}
