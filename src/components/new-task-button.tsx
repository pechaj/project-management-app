import { Link } from "react-router-dom";

export function NewTaskButton({ code }: { code: string }) {
  return (
    <Link
      className="col fs-5 fw-bold TaskCard m-3 list-group-item text-center"
      state={{ projectCode: code }}
      to={"/tasks/new"}
    >
      +
    </Link>
  );
}
