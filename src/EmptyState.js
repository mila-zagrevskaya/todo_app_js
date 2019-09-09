import { createElementWithAttributes } from './createElementWithAttributes';
import { containerForEmptyScreen } from './wrapper';
import { app } from './index';


export class EmptyState {
  constructor() {
    const startBox = createElementWithAttributes({
      tagName: 'div',
      container: containerForEmptyScreen,
      attributes: { className: 'start-box' },
    });
    const title = createElementWithAttributes({
      tagName: 'h2',
      container: startBox,
      attributes: { className: 'h2', textContent: 'No active todos' },
    });
    const buttonAddTodo = createElementWithAttributes({
      tagName: 'button',
      container: startBox,
      attributes: { className: 'add-button', textContent: 'Add todo', id: 'myButton' },
      eventType: 'click',
      eventHandler: app.openModal,
    });

    const archiveElement = createElementWithAttributes({
      tagName: 'span',
      container: startBox,
      attributes: { className: 'archive', textContent: 'Show resolved todos' },
      eventType: 'click',
      eventHandler: app.renderArchivedTasksScreen,
    });
  }
}
