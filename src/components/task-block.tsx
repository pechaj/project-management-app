import { NewTaskButton } from "@components/new-task-button";
import { TaskItem } from "@components/task-item";

export function TaskBlock({ tasks, code }: { tasks: Record<string, string>; code: string }) {
  return (
    <div className="TaskList container list-group list-group-flush p-2">
      {Object.entries(tasks).map(([key, value]) => (
        <TaskItem key={key} projectId={code} taskCode={value} />
      ))}
      <NewTaskButton code={code} />
    </div>
  );
}
