import { Button } from "react-aria-components";

function DeleteButton({
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
        <div className="loader" />
      ) : (
        <Button className="col m-2" isDisabled={isFetching} onPress={handleDelete}>
          {deleted ? <span>Restore</span> : <span>Delete</span>}
        </Button>
      )}
    </>
  );
}

export default DeleteButton;
