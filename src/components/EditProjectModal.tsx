import type { project } from "@project-types/project";
import { Dialog } from "react-aria-components";
import { EditProjectForm } from "@components/EditProjectComponents";

const EditProjectModal = ({ object }: { object: project }) => {
  // TODO: rework this, very buggy, modal not working like modal, maybe delete onClose?
  return (
    <Dialog role="dialog">
      <EditProjectForm object={object} />
    </Dialog>
  );
};

export { EditProjectModal };
