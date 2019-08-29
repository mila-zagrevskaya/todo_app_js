import { addElem } from './addElem';
import { wrapper } from './wrapper';
import { Task } from './task';
import { app } from './index';

export class Archive {
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
    this.tasksWrap = addElem({ tagName: 'div', container: this.tasksContainer, className: 'tasks-wrap' });
    this.mapItems(items);
  }
}
