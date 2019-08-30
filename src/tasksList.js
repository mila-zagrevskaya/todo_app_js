import moment from 'moment';
import { addElem } from './addElem';
import { wrapper } from './wrapper';
import { Task } from './task';
import { app } from './index';


export class TasksList {
  constructor(items) {
    this.tasksContainer = addElem({ tagName: 'div', container: wrapper, className: 'tasks-container' });
    this.controlBar = addElem({ tagName: 'div', container: this.tasksContainer, className: 'title-wrap' });
    this.separationStateItems(items);
    this.tasksWrap = addElem({ tagName: 'div', container: this.tasksContainer, className: 'tasks-wrap' });
    this.showTaskItems(items);
  }


  makeControlsBarIsActive = (items) => {
    this.controlBar.textContent = '';
    this.buttonAddTodo = addElem({
      tagName: 'button', container: this.controlBar, className: 'add-button', text: 'Add new todo', id: 'myButton',
    });
    this.buttonAddTodo.addEventListener('click', app.openModal);
    this.span = addElem({
      tagName: 'span', container: this.controlBar, className: 'archive', text: 'Show resolved todos',
    });
    this.span.addEventListener('click', this.showIsExpiredItems);
  }

 makeControlsBarIsExpired = (items) => {
   this.controlBar.textContent = '';
   this.span = addElem({
     tagName: 'span', container: this.controlBar, className: 'icon-arrow-left-thick',
   });
 }


 separationStateItems = (items) => {
   if (app.getExpiredItems) {
     this.makeControlsBarIsExpired(items);
     app.getExpiredItems(items);
     console.log('expired items', items);
   }
   if (app.getActiveItems) {
     this.makeControlsBarIsActive(items);
     console.log('Active items', items);
   }
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

  showTaskItems = async (items) => {
    await app.createStartScreen;
    this.mapItems(items);
  }
}
