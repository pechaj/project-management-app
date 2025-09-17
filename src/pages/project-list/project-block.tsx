import "@assets/styles.css";
import type { project } from "@project-types/project";
import { TaskBlock } from "@/components/TaskBlock";
import { ProjectHeader } from "@/pages/project-list/project-header";

export function ProjectBlock({ object }: { object: project }) {
  const { code, tasks, deleted } = object;

  return (
    <div className={`ProjectCard card ${deleted ? "deleted" : ""}`}>
      <ProjectHeader object={object} />
      <TaskBlock code={code} tasks={tasks} />
    </div>
  );
}
