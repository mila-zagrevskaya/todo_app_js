import { addElem } from './addElem';
import { tasksContainer } from './wrapper';
import { Task } from './Task';


export class TasksList {
  constructor() {
    this.tasksWrap = addElem({ tagName: 'div', container: tasksContainer, className: 'tasks-wrap' });
  }

  _mapItems = (items) => items.map(item => {
    const {
      title, description, deadline, doneStatus, id, expired,
    } = item;
    this.taskItem = new Task({
      contentWrap: this.tasksWrap,
      title,
      description,
      deadline,
      expired,
      doneStatus,
    });
  })

  updateItems = (items) => {
    this.tasksWrap.textContent = '';
    this._mapItems(items);
  }
}
