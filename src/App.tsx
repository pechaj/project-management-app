import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@assets/styles.css";
import { X } from "lucide-react";
import {
  Button,
  Text,
  UNSTABLE_Toast as Toast,
  UNSTABLE_ToastContent as ToastContent,
  UNSTABLE_ToastQueue as ToastQueue,
  UNSTABLE_ToastRegion as ToastRegion,
} from "react-aria-components";
import Navbar from "@components/Navbar";
import NewProjectForm from "@components/NewProjectForm";
import NewTaskForm from "@components/NewTaskForm";
import ProjectDetail from "@components/ProjectDetail.tsx";
import ProjectList from "@components/ProjectList.tsx";
import TaskDetail from "@components/TaskDetail.tsx";

// const APIUrl = "https://localhost:7148/api/";

type MyToastContent = {
  title: string;
  description?: string;
};

// Create a global ToastQueue.
export const queue = new ToastQueue<MyToastContent>();

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="bg">
        <Routes>
          <Route element={<ProjectList />} path="/projects" />
          <Route element={<ProjectDetail />} path="/projects/:projectCode" />
          <Route element={<TaskDetail />} path="/tasks/:taskCode" />
          <Route element={<NewProjectForm />} path="/projects/new" />
          <Route element={<NewTaskForm />} path="/tasks/new" />
        </Routes>
      </div>
      <ToastRegion queue={queue}>
        {({ toast }) => (
          <Toast toast={toast}>
            <ToastContent>
              <Text slot="title">{toast.content.title}</Text>
              <Text slot="description">{toast.content.description}</Text>
            </ToastContent>
            <Button slot="close">
              <X size={16} />
            </Button>
          </Toast>
        )}
      </ToastRegion>
    </BrowserRouter>
  );
}

export default App;
