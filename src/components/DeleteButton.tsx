import { Button, ProgressBar } from "react-aria-components";



function DeleteButton({ isFetching, deleted, refetch }: { isFetching: boolean, deleted: boolean, refetch: Function }) {

    return (
        <Button isPending={isFetching} className="col m-2" isDisabled={isFetching} onPress={() => { refetch() }}>
            {({ isPending }) => (
                <>
                    {!isPending && (deleted ? <span>Delete</span> : <span>Restore</span>)}
                    {isPending && (
                        <ProgressBar aria-label="Saving..." className="loader" isIndeterminate />
                    )}
                </>
            )}
        </Button>
    )
}

export default DeleteButton;