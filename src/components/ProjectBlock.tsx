import { Link } from "react-router-dom";
import { useState } from "react";
import ProjectHeader from "./ProjectHeader.tsx";
import { TaskBlock } from "./TaskBlock.tsx";
import axios from "axios";

export default function ProjectBlock({ project }) {

    const { code, name, tasks, deleted } = project;

    // console.log("Rendering ProjectBlock for project:", project);
    return (
        <div className={"ProjectCard card" + (deleted ? " deleted" : "")}>
            <ProjectHeader project={project} />
            <TaskBlock tasks={tasks} code={code} />
        </div>
    )
}