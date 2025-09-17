import { useState } from "react";
import type { project } from "@project-types/project";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Button, Form, Label, ProgressBar } from "react-aria-components";
import {
  ProjectCodeInput,
  ProjectDeletedInput,
  ProjectNameInput,
  ProjectNotesInput,
} from "@components/edit-project-components";
import { ModalHeader } from "@components/modal-header";

export function EditProjectForm({ object }: { object: project }) {
  const [name, setName] = useState(object.name);

  const [notes, setNotes] = useState(object.notes);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(event.target.value);
  };

  const handlePut = async () => {
    const updatedProject = {
      code: object.code,
      name,
      notes,
      deleted: object.deleted,
      tasks: object.tasks,
    };

    await axios.put(`/api/Projects/${object.code}`, updatedProject);
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
    return (
      <Label className="fs-4 secondary-font-color mx-auto">
        Project was successfully updated. (To see changes, reload the page)
      </Label>
    );
  }

  return (
    <Form
      className="mx-auto bg-light"
      id="edit-project-form"
      onSubmit={handleSubmit}
      style={{ padding: "20px", width: "500px" }}
    >
      <ModalHeader title="Project editation form" />
      <ProjectCodeInput code={object.code} handleCodeChange={undefined} isDisabled={true} />
      <ProjectNameInput handleNameChange={handleNameChange} name={name} />
      <ProjectNotesInput handleNotesChange={handleNotesChange} notes={notes} />
      <ProjectDeletedInput deleted={object.deleted} isDisabled={true} />

      <Button className="btn btn-success" type="submit">
        Save
      </Button>
    </Form>
  );
}
