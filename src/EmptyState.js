import { addElem } from './addElem';
import { wrapper } from './wrapper';
import { app } from './index';


export class EmptyState {
  constructor() {
    wrapper.textContent = '';
    const startBox = addElem({ tagName: 'div', container: wrapper, className: 'start-box' });
    const title = addElem({
      tagName: 'h2', container: startBox, className: 'h2', text: 'No active todos',
    });
    const buttonAddTodo = addElem({
      tagName: 'button', container: startBox, className: 'add-button', text: 'Add todo', id: 'myButton',
    });
    buttonAddTodo.addEventListener('click', app.openModal);
    const archiveElement = addElem({
      tagName: 'span', container: startBox, className: 'archive', text: 'Show resolved todos',
    });
    archiveElement.addEventListener('click', app._createExpiredScreen);
  }
}
