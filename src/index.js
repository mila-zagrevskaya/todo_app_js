import _ from 'lodash';
import '../public/style/all.css';

import StartPageElement from './startPage';
import TaskList from './tasksList';

export const url = 'http://localhost:3000/tasks';

const startElem = new StartPageElement();
const tasksList = new TaskList();
