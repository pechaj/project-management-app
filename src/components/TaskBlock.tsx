import { TaskItem } from "./TaskItem.tsx";
import { NewTaskButton } from "./NewTaskButton.tsx";

export function TaskBlock({ tasks, code }) {

    return (
        <>
            <div className="container TaskList list-group list-group-flush p-2">
                {tasks?.map(task => (
                    <TaskItem key={task} taskCode={task} projectId={code} />
                ))}
                <NewTaskButton code={code} />
            </div>


        </>
    )
}