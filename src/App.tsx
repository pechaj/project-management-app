import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ProjectList from './components/ProjectList.tsx';
import ProjectDetail from './components/ProjectDetail';
import TaskDetail from './components/TaskDetail';
import NewProjectForm from './components/NewProjectForm';
import Navbar from './components/Navbar.tsx';
import NewTaskForm from './components/NewTaskForm';

// const APIUrl = "https://localhost:7148/api/";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/projects"
            element={<ProjectList />}
          />
          <Route
            path="/projects/:projectCode"
            element={<ProjectDetail />}
          />
          <Route
            path="/tasks/:taskCode"
            element={<TaskDetail />}
          />
          <Route
            path="/projects/new"
            element={<NewProjectForm />}
          />
          <Route
            path="/tasks/new"
            element={<NewTaskForm />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
