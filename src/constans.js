export const basicUrl = 'http://localhost:3000/';
export const tasksUrl = `${basicUrl}tasks`;

export const tasksArchiveUrl = `${tasksUrl}/?doneStatus=true&?expired=true`;
export const activeTasksUrl = `${tasksUrl}/?doneStatus=false&expired=false`;
