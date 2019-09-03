import _ from 'lodash';
import '../public/style/all.css';

import { App } from './App';
import { ControlsBar } from './ControlsBar';
import { TasksList } from './TasksList';

export const controlBar = new ControlsBar();
export const tasksList = new TasksList();

export const app = new App();
app.init();
