export const basicUrl = 'http://localhost:3000/';
export const tasksUrl = `${basicUrl}tasks`;

export const tasksArchiveUrl = `${tasksUrl}/?q=true`;
export const activeTasksUrl = `${tasksUrl}/?doneStatus=false&expired=false`;
