import { addElem } from './addElem';
import { wrapper } from './wrapper';
import { app } from './index';


export class EmptyState {
  constructor() {
    const startBox = addElem({ tagName: 'div', container: wrapper, className: 'start-box' });
    this.title = addElem({
      tagName: 'h2', container: startBox, className: 'h2', text: 'No active todos',
    });
    this.btnAddTodo = addElem({
      tagName: 'button', container: startBox, className: 'add-btn', text: 'Add todo', id: 'myBtn',
    });
    this.btnAddTodo.addEventListener('click', app.openModal);
    this.span = addElem({
      tagName: 'span', container: startBox, className: 'archive', text: 'Show resolved todos',
    });
  }
}
