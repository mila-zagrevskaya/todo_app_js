import { createElementWithAttributes } from './createElementWithAttributes';

export const wrapper = createElementWithAttributes(
  {
    tagName: 'div',
    container: document.body,
    attributes: { className: 'wrapper' },
  },
);

export const tasksContainer = createElementWithAttributes(
  {
    tagName: 'div',
    container: wrapper,
    attributes: { className: 'tasks-container' },
  },
);
export const containerForEmptyScreen = createElementWithAttributes(
  {
    tagName: 'div',
    container: wrapper,
    attributes: { className: 'empty-screen-container' },
  },
);
