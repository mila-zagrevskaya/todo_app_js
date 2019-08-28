import { addElem } from './addElem';

export class Task {
  constructor(contentWrap, title, description, deadline) {
    this.task = addElem({ tagName: 'div', container: contentWrap, className: 'task-item' });
    this.iconBox = addElem({ tagName: 'div', container: this.task, className: 'icon-box' });
    this.iconCheckmark = addElem({ tagName: 'span', container: this.iconBox, className: 'icon-done_outline' });
    this.iconEdit = addElem({ tagName: 'span', container: this.iconBox, className: 'icon-edit-pencil' });
    this.title = addElem({
      tagName: 'h5', container: this.task, className: 'title', text: title,
    });
    this.description = addElem({
      tagName: 'p', container: this.task, className: 'description', text: description,
    });
    this.deadline = addElem({ tagName: 'div', container: this.task, className: 'deadline' });
    this.term = addElem({
      tagName: 'h6', container: this.deadline, className: 'term', text: `${deadline} days`,
    });
    this.termIcon = addElem({ tagName: 'span', container: this.deadline, className: 'icon-fiber_manual_record' });
  }
}
