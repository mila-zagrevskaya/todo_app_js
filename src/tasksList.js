import moment from 'moment';
import { addElem } from './addElem';
import { wrapper } from './wrapper';
import { Task } from './task';
import { Archive } from './archive';
import { app } from './index';


export class TasksList {
  constructor(items) {
    this.tasksContainer = addElem({ tagName: 'div', container: wrapper, className: 'tasks-container' });
    this.titleWrap = addElem({ tagName: 'div', container: this.tasksContainer, className: 'title-wrap' });
    this.buttonAddTodo = addElem({
      tagName: 'button', container: this.titleWrap, className: 'add-button', text: 'Add new todo', id: 'myButton',
    });
    this.buttonAddTodo.addEventListener('click', app.openModal);
    this.span = addElem({
      tagName: 'span', container: this.titleWrap, className: 'archive', text: 'Show resolved todos',
    });
    this.span.addEventListener('click', this.getArchive);
    this.tasksWrap = addElem({ tagName: 'div', container: this.tasksContainer, className: 'tasks-wrap' });
    this.showTaskItems(items);
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

  showExpiredItems = items => {
    items.map(item => {
      app.isExpiredTask(item.deadline)
        ? this.makeTaskItems(item) : null;
    });
  }

  getArchive = () => {
    wrapper.textContent = '';
    return new Archive();
  }

  mapItems = (items) => items.map(item => {
    !app.isExpiredTask(item.deadline)
      ? this.makeTaskItems(item) : null;
  })

  showTaskItems = async (items) => {
    await app.createStartScreen;
    this.mapItems(items);
  }
}
