import { addElem } from './addElem';
import { tasksContainer } from './wrapper';
import { Task } from './Task';


export class TasksList {
  constructor() {
    this.tasksWrap = addElem({ tagName: 'div', container: tasksContainer, className: 'tasks-wrap' });
  }

  _makeTaskItems = (item) => {
    const {
      title, description, deadline, id, expired,
    } = item;
    this.taskItem = new Task({
      contentWrap: this.tasksWrap,
      title,
      description,
      deadline,
      expired,
    });
  }

  _mapItems = (items) => items.map(item => {
    this._makeTaskItems(item);
  })

  updateItems = (items) => {
    this.tasksWrap.textContent = '';
    this._mapItems(items);
  }
}
