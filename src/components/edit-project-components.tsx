import { Checkbox, Input, Label, TextArea, TextField } from "react-aria-components";

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
  handleDeletedChange,
}: {
  deleted: boolean;
  isDisabled: boolean;
  handleDeletedChange?: (isSelected: boolean) => void;
}) {
  return (
    <div className="m-3">
      <Checkbox isDisabled={isDisabled} isSelected={deleted} onChange={handleDeletedChange}>
        Deleted
      </Checkbox>
    </div>
  );
}
