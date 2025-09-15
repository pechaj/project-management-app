import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@assets/styles.css";
import Navbar from "@components/Navbar";
import NewProjectForm from "@components/NewProjectForm";
import NewTaskForm from "@components/NewTaskForm";
import ProjectDetail from "@components/ProjectDetail.tsx";
import ProjectList from "@components/ProjectList.tsx";
import TaskDetail from "@components/TaskDetail.tsx";

// const APIUrl = "https://localhost:7148/api/";

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
    </BrowserRouter>
  );
}

export default App;
