import _ from 'lodash';
import '../public/style/all.css';
import { App } from './App';


export const basicUrl = 'http://localhost:3000/';
export const tasksUrl = `${basicUrl}tasks`;

export const app = new App();
app.updateTasks();
