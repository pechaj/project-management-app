import type React from "react";
import { type Key, useState } from "react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Heading, Label } from "react-aria-components";
import { useLocation, useNavigate } from "react-router";
import { ProjectCodeInput, ProjectDeletedInput, ProjectNotesInput } from "@components/edit-project-components";
import {
  TaskDeadlineInput,
  TaskPlaceInput,
  TaskProjectIdInput,
  TaskUrgencyInput,
} from "@components/edit-task-components";
import { LoadingIcon } from "@/components/loading-icon";

export function NewTaskForm() {
  const navigate = useNavigate();
  const projectCode = useLocation().state.projectCode;

  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState<string>(today(getLocalTimeZone()).toString());
  const [urgency, setUrgency] = useState("Not selected");
  const [place, setPlace] = useState("");
  const [deleted, setDeleted] = useState(false);

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

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

  const handleDeletedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeleted(event.target.checked);
  };

  const handlePost = async () => {
    const newTask = {
      code: code ?? "",
      projectId: projectCode ?? "",
      description: description ?? "",
      deadline: deadline ?? "",
      urgency,
      place: place ?? "",
      deleted,
    };

    await axios.post("http://localhost:5295/api/Tasks", newTask);
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
        <Label className="fs-2">Creating new project...</Label>
        <LoadingIcon />
      </div>
    );
  }

  if (postMutation.isSuccess) {
    navigate("/projects");
  }

  return (
    <form className="container mx-auto w-25" id="new-task-form" onSubmit={handleSubmit}>
      <Heading className="fs-2 secondary-font-color mb-2 text-center">New Task</Heading>
      <ProjectCodeInput code={code} handleCodeChange={handleCodeChange} isDisabled={false} />
      <TaskProjectIdInput projectId={projectCode} />
      <ProjectNotesInput handleNotesChange={handleDescriptionChange} notes={description} />
      <TaskDeadlineInput deadline={deadline} handleDeadlineChange={handleDeadlineChange} />
      <TaskUrgencyInput handleUrgencyChange={handleUrgencyChange} urgency={urgency} />
      <TaskPlaceInput handlePlaceChange={handlePlaceChange} place={place} />
      <ProjectDeletedInput deleted={deleted} handleDeletedChange={handleDeletedChange} isDisabled={false} />

      <button className="btn btn-success" type="submit">
        Save
      </button>
    </form>
  );
}
