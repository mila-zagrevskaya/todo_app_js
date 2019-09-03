import { addElem } from './addElem';
import { app } from './index';
import { tasksContainer } from './wrapper';

export class ControlsBar {
  constructor() {
    this.wrapperControlsBar = addElem({ tagName: 'div', container: tasksContainer, className: 'title-wrap' });
  }

  renderControlsBarForActiveTasks = () => {
    this.wrapperControlsBar.textContent = '';
    const buttonAddTodo = addElem({
      tagName: 'button', container: this.wrapperControlsBar, className: 'add-button', text: 'Add new todo', id: 'myButton',
    });
    buttonAddTodo.addEventListener('click', app.openModal);
    const archiveElement = addElem({
      tagName: 'span', container: this.wrapperControlsBar, className: 'archive', text: 'Show resolved todos',
    });
    archiveElement.addEventListener('click', app._renderExpiredTasksScreen);
  }

  renderControlsBarForExpiredTasks = () => {
    this.wrapperControlsBar.textContent = '';
    const archiveElement = addElem({
      tagName: 'span', container: this.wrapperControlsBar, className: 'icon-arrow-left-thick',
    });
    archiveElement.addEventListener('click', app._renderActiveTasksScreen);
  }
}
