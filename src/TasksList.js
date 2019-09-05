import { createElementWithAttributes } from './createElementWithAttributes';
import { tasksContainer } from './wrapper';
import { Task } from './Task';


export class TasksList {
  _mapItems = (items) => items.map(item => {
    const {
      title, description, deadline, doneStatus, id, expired,
    } = item;
    this.taskItem = new Task({
      contentWrap: this.tasksWrap,
      title,
      description,
      deadline,
      id,
      expired,
      doneStatus,
    });
  })

  updateItems = (items) => {
    this.tasksWrap = createElementWithAttributes({
      tagName: 'div',
      container: tasksContainer,
      attributes: { className: 'tasks-wrap', textContent: '' },
    });
    this._mapItems(items);
  }
}
