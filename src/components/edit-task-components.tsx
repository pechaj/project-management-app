import type React from "react";
import { type CalendarDate, getLocalTimeZone, parseDate, today } from "@internationalized/date";
import "@assets/styles.css";
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  DateInput,
  DatePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Input,
  type Key,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
  TextField,
} from "react-aria-components";

export function TaskProjectIdInput({ projectId }: { projectId: string }) {
  return (
    <TextField className="m-3" isDisabled type="text">
      <Label className="form-label secondary-font-color">Project Id</Label>
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
    } catch {
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
      <Label className="form-label secondary-font-color">Deadline:</Label>
      {/* visible input */}
      <Group className="d-flex justify-content-start w-50 rounded border bg-white">
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
    <Select className="m-3" isRequired onSelectionChange={handleUrgencyChange} selectedKey={urgency}>
      <Label className="secondary-font-color">Urgency:</Label>
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
      <Label className="form-label secondary-font-color">Place: </Label>
      <Input className="form-control" onChange={handlePlaceChange} value={place} />
    </TextField>
  );
}
