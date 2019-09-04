export const basicUrl = 'http://localhost:3000/';
export const tasksUrl = `${basicUrl}tasks`;
export const activeTasksUrl = `${tasksUrl}/?expired=false`;
export const expiredTasksUrl = `${tasksUrl}/?expired=true`;

export const tasksDoneUrl = `${tasksUrl}/?doneStatus=true`;
export const tasksNotСompletedUrl = `${tasksUrl}/?doneStatus=false`;
