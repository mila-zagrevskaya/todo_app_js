import _ from 'lodash';
import '../public/style/all.css';
import { App } from './App';
import { ControlsBar } from './controlsBar';
import { TasksList } from './tasksList';

export const basicUrl = 'http://localhost:3000/';
export const tasksUrl = `${basicUrl}tasks`;
export const activeTasksUrl = `${tasksUrl}/?expired=false`;
export const expiredTasksUrl = `${tasksUrl}/?expired=true`;


export const controlBar = new ControlsBar();
export const tasksList = new TasksList();

export const app = new App();
app.createStartScreen();
