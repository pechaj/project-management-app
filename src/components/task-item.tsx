import { Link } from "react-router-dom";

export function TaskItem({ taskCode, projectId }: { taskCode: string; projectId: string }) {
  return (
    <div className="m-2">
      <Link className="col fs-5 fw-bold TaskCard list-group-item" state={{ projectId, taskCode }} to={"/tasks/detail"}>
        <p>{taskCode}</p>
      </Link>
    </div>
  );
}
