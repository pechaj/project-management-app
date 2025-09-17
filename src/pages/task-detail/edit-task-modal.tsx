import type { task } from "@project-types/task.tsx";
import { Dialog } from "react-aria-components";
import { EditTaskForm } from "@pages/task-detail/edit-task-form";

const EditTaskModal = ({ object }: { object: task }) => {
  // Not working correctly as a modal
  return (
    <Dialog className="w-50" role="dialog">
      <EditTaskForm object={object} />
    </Dialog>
  );
};

export { EditTaskModal };
