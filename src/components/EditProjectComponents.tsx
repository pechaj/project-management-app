import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Button, Checkbox, Form, Input, Label, ProgressBar, TextArea, TextField } from "react-aria-components";
import { ModalHeader } from "@components/ModalHeader";
import type { project } from "@/project-types/project.tsx";

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

export function ProjectCodeInput({
  code,
  handleCodeChange,
  isDisabled,
}: {
  code: string;
  handleCodeChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  isDisabled: boolean;
}) {
  return (
    <TextField className="m-3" isDisabled={isDisabled} isRequired type="text">
      <Label className="form-label secondary-font-color">Code</Label>
      <Input className="form-control" onChange={handleCodeChange} value={code} />
    </TextField>
  );
}

export function ProjectNameInput({
  name,
  handleNameChange,
}: {
  name: string;
  handleNameChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <TextField className="m-3" isRequired type="text">
      <Label className="form-label">Name</Label>
      <Input className="form-control" onChange={handleNameChange} value={name} />
    </TextField>
  );
}

export function ProjectNotesInput({
  notes,
  handleNotesChange,
}: {
  notes: string;
  handleNotesChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}) {
  return (
    <TextField className="m-3" type="text">
      <Label className="form-label secondary-font-color">Notes</Label>
      <TextArea className="form-control" onChange={handleNotesChange} value={notes} />
    </TextField>
  );
}

export function ProjectDeletedInput({
  deleted,
  isDisabled,
  handleDeletedChange = null,
}: {
  deleted: boolean;
  isDisabled: boolean;
  handleDeletedChange?: (isSelected: boolean) => void | null;
}) {
  return (
    <div className="m-3">
      <Checkbox isDisabled={isDisabled} isSelected={deleted} onChange={handleDeletedChange}>
        Deleted
      </Checkbox>
    </div>
  );
}
