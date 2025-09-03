import { Link } from "react-router-dom";

export function NewTaskButton({ code }) {
    return (

        <Link className="col text-center fs-5 fw-bold list-group-item m-2" to={`/tasks/new`} state={{ projectCode: code }}>
            +
        </Link>
    )
}