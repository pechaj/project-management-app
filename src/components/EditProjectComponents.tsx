import { TextField, Label, Input, Button, Heading, TextArea, Checkbox, Form, ProgressBar } from "react-aria-components";
import { ModalHeader } from './ModalHeader.tsx';
import { useState } from "react";
import Project from "../shared/interfaces/IProject.tsx";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function EditProjectForm({ project }: { project: Project }) {

    const [name, setName] = useState(project.name);

    const [notes, setNotes] = useState(project.notes);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleNotesChange = (event) => {
        setNotes(event.target.value);
    };

    const handlePut = async () => {

        const updatedProject = {
            "code": project.code,
            "name": name,
            "notes": notes,
            "deleted": project.deleted,
            "tasks": project.tasks,
        };

        await axios.put(`/api/Projects/${project.code}`, updatedProject);
    }

    const putMutation = useMutation({
        mutationFn: handlePut,
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        await putMutation.mutateAsync();
    }

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
        <Form className="modal-body" style={{ padding: '20px', width: '500px' }} onSubmit={handleSubmit} id="edit-project-form">
            <ModalHeader title='Project editation form' />
            <ProjectCodeInput code={project.code} />
            <ProjectNameInput name={name} handleNameChange={handleNameChange} />
            <ProjectNotesInput notes={notes} handleNotesChange={handleNotesChange} />
            <ProjectDeletedInput deleted={project.deleted} />

            <Button type="submit" className='btn btn-primary'>Save</Button>
        </Form>
    )
}

export function ProjectCodeInput({ code }) {

    return (
        <TextField type="text" className="m-3" isDisabled>
            <Label className='form-label'>Code</Label>
            <Input className='form-control' value={code} />
        </TextField>
    )
}

export function ProjectNameInput({ name, handleNameChange }: { name: string, handleNameChange }) {

    return (
        <TextField type="text" className='m-3'>
            <Label className='form-label'>Name</Label>
            <Input className='form-control' value={name} onChange={handleNameChange} />
        </TextField>
    )
}

export function ProjectNotesInput({ notes, handleNotesChange }: { notes: string, handleNotesChange }) {

    return (
        <TextField type="text" className='m-3'>
            <Label className='form-label'>Notes</Label>
            <TextArea className='form-control' value={notes} onChange={handleNotesChange} />
        </TextField>
    )
}

export function ProjectDeletedInput({ deleted }) {

    return (
        <div className="m-3">
            <Checkbox isSelected={deleted} isDisabled >
                Deleted
            </Checkbox>
        </div>
    )
}