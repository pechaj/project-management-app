import { useState } from "react";
import Task from "../shared/interfaces/ITask";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Button, DateField, DateInput, DatePicker, DateSegment, DateValue, Form, Input, Label, ProgressBar, TextField } from "react-aria-components";
import { ModalHeader } from "./ModalHeader.tsx";
import { ProjectCodeInput, ProjectDeletedInput, ProjectNotesInput } from "./EditProjectComponents.tsx";

export function EditTaskForm({ task }: { task: Task }) {

    const [description, setDescription] = useState<string>(task.description);

    const [deadline, setDeadline] = useState<string>(task.deadline);

    const [urgency, setUrgency] = useState(task.urgency);

    const [place, setPlace] = useState(task.place);

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleDeadlineChange = (event) => {
        setDeadline(event.target.value);
    };

    const handleUrgencyChange = (event) => {
        setUrgency(event.target.value);
    };

    const handlePlaceChange = (event) => {
        setPlace(event.target.value);
    };

    const handlePut = async () => {

        const updatedTask = {
            "code": task.code,
            "projectId": task.projectId,
            "description": description,
            "urgency": urgency,
            "deleted": task.deleted,
            "place": place,
            "deadline": deadline,
        };

        await axios.put(`http://localhost:5295/api/Tasks/${task.code}`, updatedTask);
    }

    const putMutation = useMutation({
        mutationFn: handlePut,
    });

    const handleSubmit = async (event) => {
        await putMutation.mutateAsync();
    };

    if (putMutation.isPending) return (
        <div className="m-3">
            <Label className="fs-2">Saving...</Label>
            <ProgressBar aria-label="Saving..." className="loader p-3" isIndeterminate />
        </div>
    );

    if (putMutation.isError) return (
        <>
            <Label>There was a problem saving the project: {putMutation.error.message}</Label>
        </>
    )

    return (
        <Form className="modal-body" style={{ padding: '20px', width: '500px' }} onSubmit={handleSubmit} id="edit-task-form">
            <ModalHeader title="Task editation form" />
            <ProjectCodeInput code={task.code} />
            <TaskProjectIdInput projectId={task.projectId} />
            <ProjectNotesInput notes={description} handleNotesChange={handleDescriptionChange} />
            <TaskDeadlineInput deadline={deadline ?? ""} handleDeadlineChange={handleDeadlineChange} />
            <ProjectDeletedInput deleted={task.deleted} />

            <Button type="submit" className='btn btn-primary'>Save</Button>
        </Form>
    )

}

export function TaskProjectIdInput({ projectId }: { projectId: string }) {
    return (
        <TextField type="text" className="m-3" isDisabled>
            <Label className="form-label">Project Id:</Label>
            <Input className="form-control" value={projectId} />
        </TextField>
    )
}

export function TaskDeadlineInput({ deadline, handleDeadlineChange }: { deadline: string, handleDeadlineChange }) {
    console.log(deadline);
    return (
        <TextField type="text" className="m-3">
            <Label className="form-label">Deadline:</Label>
            <Input className="form-control" value={deadline} onChange={handleDeadlineChange} />
        </TextField>

    );
}