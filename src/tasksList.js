import moment from 'moment';
import { addElem } from './addElem';
import { tasksContainer } from './wrapper';
import { Task } from './task';


export class TasksList {
  constructor() {
    this.tasksWrap = addElem({ tagName: 'div', container: tasksContainer, className: 'tasks-wrap' });
  }

  countTime = (deadline) => {
    const date = moment(new Date().getTime());
    const timeDeadline = moment(deadline);
    const minutes = timeDeadline.diff(date, 'minutes');
    const hours = timeDeadline.diff(date, 'hours');
    const days = timeDeadline.diff(date, 'days');
    return { minutes, hours, days };
  };

  getFormatedTime = ({ minutes, hours, days }) => {
    if (days >= 1) {
      const hour = (hours - (days * 24));
      return (`${days} day(s) ${hour} hour(s)`);
    }
    if (hours >= 1) {
      const minute = (minutes - (hours * 60));
      return (`${hours} hour(s) ${minute} minute(s)`);
    }
    return (`${minutes} minute(s)`);
  }

  getTaskColor = ({ hours, days }) => {
    if (days >= 1) {
      return ('#508775');
    }
    if (hours >= 4) {
      return ('#e8d64f');
    }
    return ('#c23232');
  }

  makeTaskItems = (item) => {
    const {
      title, description, deadline, id, expired,
    } = item;
    const time = this.countTime(deadline);
    const formatedTime = this.getFormatedTime(time);
    const taskColor = this.getTaskColor(time);
    this.taskItem = new Task({
      contentWrap: this.tasksWrap,
      title,
      description,
      deadline: formatedTime,
      taskColor,
      expired,
    });
  }

  mapItems = (items) => items.map(item => {
    this.makeTaskItems(item);
  })

  updateItems = (items) => {
    this.tasksWrap.textContent = '';
    this.mapItems(items);
  }
}
