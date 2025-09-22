import type { project } from "@project-types/project";
import { Button, DialogTrigger, Modal } from "react-aria-components";
import { useLocation } from "react-router-dom";
import { TaskBlock } from "@components/task-block";
import { EditProjectModal } from "@pages/project-detail/edit-project-modal";

export function ProjectDetail() {
  const object: project = useLocation().state?.object;

  if (!useLocation().state) {
    return (
      <div className="secondary-font-color mx-auto">
        <span>False redirect.</span>
      </div>
    );
  }

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
        <Button className="btn btn-dark secondary-font-color">Edit Project</Button>
        <Modal isDismissable>
          <EditProjectModal object={object} />
        </Modal>
      </DialogTrigger>
    </div>
  );
}
