import { createElementWithAttributes } from './createElementWithAttributes';
import { app } from './index';
import { tasksContainer } from './wrapper';

export class ControlsBar {
  _renderControlsBarForActiveTasks = () => {
    const buttonAddTodo = createElementWithAttributes({
      tagName: 'button',
      container: this.wrapperControlsBar,
      attributes: { className: 'add-button', textContent: 'Add new todo', id: 'myButton' },
      eventType: 'click',
      eventHandler: app.openModal,
    });

    const archiveElement = createElementWithAttributes({
      tagName: 'span',
      container: this.wrapperControlsBar,
      attributes: { className: 'archive', textContent: 'Show resolved todos' },
      eventType: 'click',
      eventHandler: app.renderArchivedTasksScreen,
    });
  }

  _renderControlsBarForExpiredTasks = () => {
    const archiveElement = createElementWithAttributes({
      tagName: 'span',
      container: this.wrapperControlsBar,
      attributes: { className: 'icon-arrow-left-thick' },
      eventType: 'click',
      eventHandler: app.renderActiveTasksScreen,
    });
  }

  renderControlBar = (status) => {
    this.wrapperControlsBar = createElementWithAttributes(
      {
        tagName: 'div',
        container: tasksContainer,
        attributes: { className: 'title-wrap' },
      },
    );
    if (status === 'expired') {
      this._renderControlsBarForExpiredTasks();
      return;
    }
    if (status === 'active') {
      this._renderControlsBarForActiveTasks();
      return;
    }
    console.error('isn`t valid parameter');
  }
}
