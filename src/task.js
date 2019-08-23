import { addElem } from './addElem';
import { container } from './tasksList';


class Task {
  constructor(title, description, deadline) {
    const task = addElem({ tagName: 'div', container, className: 'task-item' });
    this.iconBox = addElem({ tagName: 'div', container: this.task, className: 'icon-box' });
    this.iconCheckmark = addElem({ tagName: 'span', container: this.iconBox, className: 'icon-checkmark' });
    this.iconEdit = addElem({ tagName: 'span', container: this.iconBox, className: 'icon-edit-pencil' });
    this.title = addElem({
      tagName: 'h5', container: this.task, className: 'title', text: title,
    });
    this.description = addElem({
      tagName: 'p', container: this.task, className: 'description', text: description,
    });
    this.deadline = addElem({ tagName: 'div', container: this.task, className: 'deadline' });
    this.term = addElem({
      tagName: 'h6', container: this.deadline, className: 'term', text: deadline,
    });
    this.termIcon = addElem({ tagName: 'span', container: this.deadline, className: 'icon-circle' });
  }
}

export default Task;
