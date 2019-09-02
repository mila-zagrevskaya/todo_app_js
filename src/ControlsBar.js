import { addElem } from './addElem';
import { app } from './index';
import { tasksContainer } from './wrapper';

export class ControlsBar {
  constructor() {
    this.wrapperControlsBar = addElem({ tagName: 'div', container: tasksContainer, className: 'title-wrap' });
  }

  _renderControlsBarForActiveTasks = () => {
    this.wrapperControlsBar.textContent = '';
    const buttonAddTodo = addElem({
      tagName: 'button', container: this.wrapperControlsBar, className: 'add-button', text: 'Add new todo', id: 'myButton',
    });
    buttonAddTodo.addEventListener('click', app.openModal);
    const archiveElement = addElem({
      tagName: 'span', container: this.wrapperControlsBar, className: 'archive', text: 'Show resolved todos',
    });
    archiveElement.addEventListener('click', app.renderExpiredTasksScreen);
  }

  _renderControlsBarForExpiredTasks = () => {
    this.wrapperControlsBar.textContent = '';
    this.span = addElem({
      tagName: 'span', container: this.wrapperControlsBar, className: 'icon-arrow-left-thick',
    });
    this.span.addEventListener('click', app.renderActiveTasksScreen);
  }
}
