export default interface Task {
    code: string,
    projectId: string,
    description: string,
    deadline: Date,
    urgency: string,
    place: string,
    deleted: boolean
}