import { addElem } from './addElem';
import { wrapper } from './wrapper';
import { app } from './index';


export class EmptyState {
  constructor() {
    const startBox = addElem({ tagName: 'div', container: wrapper, className: 'start-box' });
    this.title = addElem({
      tagName: 'h2', container: startBox, className: 'h2', text: 'No active todos',
    });
    this.buttonAddTodo = addElem({
      tagName: 'button', container: startBox, className: 'add-button', text: 'Add todo', id: 'myButton',
    });
    this.buttonAddTodo.addEventListener('click', app.openModal);
    this.span = addElem({
      tagName: 'span', container: startBox, className: 'archive', text: 'Show resolved todos',
    });
    this.span.addEventListener('click', app.makeControlsBarIsExpired);
  }
}
