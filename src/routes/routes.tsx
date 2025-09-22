import { Route, Routes } from "react-router-dom";
import { ProjectDetail } from "@pages/project-detail/project-detail";
import { ProjectList } from "@pages/project-list/project-list";
import { NewProjectForm } from "@pages/project-new/new-project-form";
import { TaskDetail } from "@pages/task-detail/task-detail";
import { NewTaskForm } from "@pages/task-new/new-task-form";

export function BasicRouting() {
  return (
    <Routes>
      <Route element={<ProjectList />} path="/projects" />
      <Route element={<ProjectDetail />} path="/projects/detail" />
      <Route element={<TaskDetail />} path="/tasks/detail" />
      <Route element={<NewProjectForm />} path="/projects/new" />
      <Route element={<NewTaskForm />} path="/tasks/new" />
    </Routes>
  );
}
