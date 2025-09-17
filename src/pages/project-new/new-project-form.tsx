import type React from "react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Button, Heading, Label } from "react-aria-components";
import { useNavigate } from "react-router-dom";
import {
  ProjectCodeInput,
  ProjectDeletedInput,
  ProjectNameInput,
  ProjectNotesInput,
} from "@components/edit-project-components";
import { LoadingIcon } from "@/components/loading-icon";

export function NewProjectForm() {
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [deleted, setDeleted] = useState(false);

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(event.target.value);
  };

  /*const handleDeletedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeleted(event.currentTarget.checked);
  };*/

  const handlePost = async () => {
    const newProject = {
      code: code ?? "",
      name: name ?? "",
      notes: notes ?? "",
      deleted,
    };

    await axios.post("/api/Projects", newProject);
  };

  const postMutation = useMutation({
    mutationFn: handlePost,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await postMutation.mutateAsync();
  };

  if (postMutation.isPending) {
    return (
      <div className="p-3 text-center align-items-center">
        <Label className="fs-2">Creating new task...</Label>
        <LoadingIcon />
      </div>
    );
  }

  if (postMutation.isSuccess) {
    navigate("/projects");
  }

  return (
    <form className="container mx-auto w-25 py-2" onSubmit={handleSubmit}>
      <Heading className="fs-2 secondary-font-color mb-2 text-center">New Project</Heading>
      <ProjectCodeInput code={code} handleCodeChange={handleCodeChange} isDisabled={false} />
      <ProjectNameInput handleNameChange={handleNameChange} name={name} />
      <ProjectNotesInput handleNotesChange={handleNotesChange} notes={notes} />
      <ProjectDeletedInput deleted={deleted} isDisabled={false} setDeleted={setDeleted} />

      <div className="text-center">
        <Button className="btn btn-dark secondary-font-color" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
}
