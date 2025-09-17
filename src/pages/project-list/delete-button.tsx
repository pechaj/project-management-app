import { Button } from "react-aria-components";
import { LoadingIcon } from "@/components/loading-icon";

export function DeleteButton({
  isFetching,
  deleted,
  handleDelete,
}: {
  isFetching: boolean;
  deleted: boolean;
  handleDelete: () => void;
}) {
  return (
    <>
      {isFetching ? (
        <LoadingIcon />
      ) : (
        <Button className="col m-2" isDisabled={isFetching} onPress={handleDelete}>
          {deleted ? <span>Restore</span> : <span>Delete</span>}
        </Button>
      )}
    </>
  );
}
