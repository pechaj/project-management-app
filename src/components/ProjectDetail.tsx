import { useLocation, useParams } from "react-router-dom";
import { TaskItem } from "./TaskItem.tsx";
import axios from "axios";
import { useEffect, useState } from "react";
import { EditProjectModal } from "./EditProjectModal.tsx";
import { TaskBlock } from "./TaskBlock.tsx";
import { Button, DialogTrigger, Modal } from "react-aria-components";

export default function ProjectDetail() {

    const project = useLocation().state.project;

    const { code, name, notes, deleted, tasks } = useLocation().state.project;

    return (
        <div className="container">
            <h2>{name}</h2>
            <p><b>Notes: </b>{notes}</p>
            <p><b>Deleted?</b> {deleted ? "Yes" : "No"}</p>
            <div className="container bg-dark bg-gradient">
                <TaskBlock tasks={tasks} code={code} />
            </div>
            <DialogTrigger>
                {/* TODO: rework this section*/}
                <Button className="btn btn-secondary">Edit Project</Button>
                <Modal isDismissable>
                    <EditProjectModal project={project} />
                </Modal>
            </DialogTrigger>


        </div>
    )
}
