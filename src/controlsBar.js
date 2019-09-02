import { addElem } from './addElem';
import { app } from './index';
import { tasksContainer } from './wrapper';

export class ControlsBar {
  constructor() {
    this.wrapperControlsBar = addElem({ tagName: 'div', container: tasksContainer, className: 'title-wrap' });
  }

  makeControlsBarIsActive = () => {
    this.wrapperControlsBar.textContent = '';
    this.buttonAddTodo = addElem({
      tagName: 'button', container: this.wrapperControlsBar, className: 'add-button', text: 'Add new todo', id: 'myButton',
    });
    this.buttonAddTodo.addEventListener('click', app.openModal);
    this.span = addElem({
      tagName: 'span', container: this.wrapperControlsBar, className: 'archive', text: 'Show resolved todos',
    });
    this.span.addEventListener('click', app.createExpiredList);
  }

  makeControlsBarIsExpired = () => {
    this.wrapperControlsBar.textContent = '';
    this.span = addElem({
      tagName: 'span', container: this.wrapperControlsBar, className: 'icon-arrow-left-thick',
    });
    this.span.addEventListener('click', app.createActiveTasksList);
  }
}
