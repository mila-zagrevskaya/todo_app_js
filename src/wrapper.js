import { addElem } from './addElem';

export const wrapper = addElem(
  {
    tagName: 'div',
    container: document.body,
    className: 'wrapper',
  },
);

export const tasksContainer = addElem(
  {
    tagName: 'div',
    container: wrapper,
    className: 'tasks-container',
  },
);
