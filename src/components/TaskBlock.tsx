import { NewTaskButton } from "./NewTaskButton.tsx";
import { TaskItem } from "./TaskItem.tsx";

export function TaskBlock({ tasks, code }: { tasks: string[]; code: string }) {
  return (
    <div className="TaskList container list-group list-group-flush p-2">
      {tasks?.map((task: string) => (
        <TaskItem key={task} projectId={code} taskCode={task} />
      ))}
      <NewTaskButton code={code} />
    </div>
  );
}
