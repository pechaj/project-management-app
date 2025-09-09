import { Link } from "react-router-dom";

export function TaskItem({ taskCode, projectId }: { taskCode: string; projectId: string }) {
  return (
    <div className="m-2">
      <Link
        className="col fs-5 fw-bold list-group-item list-group-item-action text-center"
        state={{ projectId }}
        to={`/tasks/${taskCode}`}
      >
        <p>{taskCode}</p>
      </Link>
    </div>
  );
}
