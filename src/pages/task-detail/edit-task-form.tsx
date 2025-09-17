import { type Key, useState } from "react";
import type { task } from "@project-types/task";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Button, Form, Label, ProgressBar } from "react-aria-components";
import { ProjectCodeInput, ProjectDeletedInput, ProjectNotesInput } from "@components/edit-project-components";
import {
  TaskDeadlineInput,
  TaskPlaceInput,
  TaskProjectIdInput,
  TaskUrgencyInput,
} from "@components/edit-task-components";
import { ModalHeader } from "@components/modal-header";

export function EditTaskForm({ object }: { object: task }) {
  const [description, setDescription] = useState<string>(object.description);

  const [deadline, setDeadline] = useState<string>(object.deadline);

  const [urgency, setUrgency] = useState(object.urgency);

  const [place, setPlace] = useState(object.place);

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleDeadlineChange = (newDate: string) => {
    setDeadline(newDate);
  };

  const handleUrgencyChange = (key: Key | null) => {
    setUrgency(key?.toString() ?? "None");
  };

  const handlePlaceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlace(event.target.value);
  };

  const handlePut = async () => {
    const updatedTask = {
      code: object.code,
      projectId: object.projectId,
      description: description ?? "",
      urgency: urgency ?? "",
      deleted: object.deleted,
      place: place ?? "",
      deadline: deadline ?? "",
    };

    await axios.put(`http://localhost:5295/api/Tasks/${object.code}`, updatedTask);
  };

  const putMutation = useMutation({
    mutationFn: handlePut,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await putMutation.mutateAsync();
  };

  if (putMutation.isPending) {
    return (
      <div className="m-3">
        <Label className="fs-2">Saving...</Label>
        <ProgressBar aria-label="Saving..." className="loader p-3" isIndeterminate />
      </div>
    );
  }

  if (putMutation.isError) {
    return <Label>There was a problem saving the project: {putMutation.error.message}</Label>;
  }

  if (putMutation.isSuccess) {
    return <Label>Task was successfully updated.</Label>;
  }

  return (
    <Form
      className="modal-body"
      id="edit-task-form"
      onSubmit={handleSubmit}
      style={{ padding: "20px", width: "500px" }}
    >
      <ModalHeader title="Task editation form" />
      <ProjectCodeInput code={object.code} isDisabled={false} />
      <TaskProjectIdInput projectId={object.projectId} />
      <ProjectNotesInput handleNotesChange={handleDescriptionChange} notes={description} />
      <TaskDeadlineInput deadline={deadline} handleDeadlineChange={handleDeadlineChange} />
      <TaskUrgencyInput handleUrgencyChange={handleUrgencyChange} urgency={urgency} />
      <ProjectDeletedInput deleted={object.deleted} isDisabled={false} />
      <TaskPlaceInput handlePlaceChange={handlePlaceChange} place={place} />

      <Button className="btn btn-primary m-3" type="submit">
        Save
      </Button>
    </Form>
  );
}
