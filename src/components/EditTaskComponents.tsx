import type React from "react";
import { useState } from "react";
import { type CalendarDate, getLocalTimeZone, parseDate, today } from "@internationalized/date";
import type { task } from "@project-types/task.tsx";
import "@assets/styles.css";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  DateInput,
  DatePicker,
  DateSegment,
  Dialog,
  Form,
  Group,
  Heading,
  Input,
  type Key,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  ProgressBar,
  Select,
  SelectValue,
  TextField,
} from "react-aria-components";
import { ProjectCodeInput, ProjectDeletedInput, ProjectNotesInput } from "./EditProjectComponents.tsx";
import { ModalHeader } from "./ModalHeader.tsx";

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
      <ProjectCodeInput code={object.code} />
      <TaskProjectIdInput projectId={object.projectId} />
      <ProjectNotesInput handleNotesChange={handleDescriptionChange} notes={description} />
      <TaskDeadlineInput deadline={deadline} handleDeadlineChange={handleDeadlineChange} />
      <TaskUrgencyInput handleUrgencyChange={handleUrgencyChange} urgency={urgency} />
      <ProjectDeletedInput deleted={object.deleted} />
      <TaskPlaceInput handlePlaceChange={handlePlaceChange} place={place} />

      <Button className="btn btn-primary m-3" type="submit">
        Save
      </Button>
    </Form>
  );
}

export function TaskProjectIdInput({ projectId }: { projectId: string }) {
  return (
    <TextField className="m-3" isDisabled type="text">
      <Label className="form-label">Project Id:</Label>
      <Input className="form-control" value={projectId} />
    </TextField>
  );
}

export function TaskDeadlineInput({
  deadline,
  handleDeadlineChange,
}: {
  deadline: string;
  handleDeadlineChange: (date: string) => void;
}) {
  let safeDeadline: CalendarDate;
  if (deadline === undefined) {
    safeDeadline = today(getLocalTimeZone());
  } else {
    try {
      safeDeadline = parseDate(deadline);
    } catch (ex) {
      safeDeadline = today(getLocalTimeZone());
    }
  }

  return (
    <DatePicker
      className="m-3"
      granularity="day"
      onChange={(date) => {
        if (date) {
          handleDeadlineChange(date.toString());
        }
      }}
      value={safeDeadline}
    >
      <Label className="form-label">Deadline:</Label>
      {/* visible input */}
      <Group className="d-flex justify-content-start w-50 rounded border">
        <DateInput className="w-100 p-2">{(segment) => <DateSegment segment={segment} />}</DateInput>
        <Button className="rounded-end border">📅</Button>
      </Group>
      <Popover>
        <Dialog>
          <Calendar className="border bg-dark p-4 text-light">
            <header>
              <Heading className="fs-4 text-center" />
            </header>
            <CalendarGrid className="">{(date) => <CalendarCell className="p-2" date={date} />}</CalendarGrid>
          </Calendar>
        </Dialog>
      </Popover>
    </DatePicker>
  );
}

export function TaskUrgencyInput({
  urgency,
  handleUrgencyChange,
}: {
  urgency: string;
  handleUrgencyChange: (key: Key | null) => void;
}) {
  return (
    <Select className="m-3" onSelectionChange={handleUrgencyChange} selectedKey={urgency}>
      <Label>Urgency:</Label>
      <br />
      <Button>
        <SelectValue />
        <span aria-hidden="true">🔻</span>
      </Button>
      <Popover className="bg-light shadow-sm">
        <ListBox className="border p-2">
          <ListBoxItem id="4 - Low">4 - Low</ListBoxItem>
          <ListBoxItem id="3 - Medium">3 - Medium</ListBoxItem>
          <ListBoxItem id="2 - High">2 - High</ListBoxItem>
          <ListBoxItem id="1 - Critical">1 - Critical</ListBoxItem>
        </ListBox>
      </Popover>
    </Select>
  );
}

export function TaskPlaceInput({
  place,
  handlePlaceChange,
}: {
  place: string;
  handlePlaceChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <TextField className="m-3">
      <Label className="form-label">Place: </Label>
      <Input className="form-control" onChange={handlePlaceChange} value={place} />
    </TextField>
  );
}
