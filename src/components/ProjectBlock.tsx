import ProjectHeader from "@components/ProjectHeader";
import { TaskBlock } from "@components/TaskBlock";
import type { project } from "@/project-types/project";

export default function ProjectBlock({ object }: { object: project }) {
  const { code, tasks, deleted } = object;

  // console.log("Rendering ProjectBlock for project:", project);
  return (
    <div className={`ProjectCard card ${deleted ? "deleted" : ""}`}>
      <ProjectHeader object={object} />
      <TaskBlock code={code} tasks={tasks} />
    </div>
  );
}
