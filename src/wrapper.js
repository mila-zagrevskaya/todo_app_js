import { addElem } from './addElem';

export const wrapper = addElem(
  {
    tagName: 'div',
    container: document.body,
    className: 'wrapper',
    text: null,
  },
);
