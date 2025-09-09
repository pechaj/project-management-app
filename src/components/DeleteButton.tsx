import { Button, ProgressBar } from "react-aria-components";
import type { project } from "@/project-types/project";

function DeleteButton({
  isFetching,
  deleted,
  refetch,
}: {
  isFetching: boolean;
  deleted: boolean;
  refetch: () => Promise<project[]>;
}) {
  return (
    <Button
      className="col m-2"
      isDisabled={isFetching}
      isPending={isFetching}
      onPress={() => {
        refetch();
      }}
    >
      {({ isPending }) => (
        <>
          {!isPending && (deleted ? <span>Delete</span> : <span>Restore</span>)}
          {isPending && <ProgressBar aria-label="Saving..." className="loader" isIndeterminate />}
        </>
      )}
    </Button>
  );
}

export default DeleteButton;
