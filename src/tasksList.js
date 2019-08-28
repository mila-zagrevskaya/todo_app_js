import { addElem } from './addElem';
import { wrapper } from './wrapper';
import { Task } from './task';
import { app } from './index';


export class TasksList {
  constructor(items) {
    this.tasksContainer = addElem({ tagName: 'div', container: wrapper, className: 'tasks-container' });
    this.titleWrap = addElem({ tagName: 'div', container: this.tasksContainer, className: 'title-wrap' });
    this.btnAddTodo = addElem({
      tagName: 'button', container: this.titleWrap, className: 'add-btn', text: 'Add new todo', id: 'myBtn',
    });
    this.btnAddTodo.addEventListener('click', app.openModal);
    this.span = addElem({
      tagName: 'span', container: this.titleWrap, className: 'archive', text: 'Show resolved todos',
    });
    this.tasksWrap = addElem({ tagName: 'div', container: this.tasksContainer, className: 'tasks-wrap' });
    this.mapItems(items);
  }

  mapItems = (items) => items.map(item => {
    this.taskItem = new Task(
      this.tasksWrap, item.title, item.description,
      Math.round((item.deadline - new Date().getTime()) / 1000 / 60 / 60),
    );
  })
}
