import { Button } from "react-aria-components";
import { Link } from "react-router-dom";

export function TaskItem({ taskCode, projectId }) {
    return (
        <div className="m-2">
            <Link className="col text-center list-group-item list-group-item-action fs-5 fw-bold" to={`/tasks/${taskCode}`} state={{ projectId: projectId }}>
                <p>{taskCode}</p>
            </Link>
        </div>

    )
}