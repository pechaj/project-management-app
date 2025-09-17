import { Button, DialogTrigger, Modal } from "react-aria-components";
import { useLocation } from "react-router-dom";
import { EditProjectModal } from "@/pages/project-detail/EditProjectModal";
import { TaskBlock } from "@/pages/project-list/TaskBlock";
import type { project } from "@/project-types/project";

export function ProjectDetail() {
  const object: project = useLocation().state.object;

  const { code, name, notes, deleted, tasks } = object;

  return (
    <div className="secondary-font-color container mx-3 w-50 border border-3 border-warning-subtle bg-dark py-3">
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
