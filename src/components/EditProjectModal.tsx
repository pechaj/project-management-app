import type { project } from "@project-types/project";
import { Dialog } from "react-aria-components";
import { EditProjectForm } from "@components/EditProjectComponents";

const EditProjectModal = ({ object }: { object: project }) => {
  return (
    <Dialog className="mx-auto w-50" role="dialog">
      <EditProjectForm object={object} />
    </Dialog>
  );
};

export { EditProjectModal };
