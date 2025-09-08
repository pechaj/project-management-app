import { DateValue } from "react-aria-components";

export default interface Task {
    code: string,
    projectId: string,
    description: string,
    deadline: string,
    urgency: string,
    place: string,
    deleted: boolean
}