import { addElem } from './addElem';
import { app } from '.';

export class Task {
  constructor({
    contentWrap, title, description, deadline, taskColor,
  }) {
    this.task = addElem({
      tagName: 'div', container: contentWrap, className: 'task-item',
    });
    this.iconBox = addElem({ tagName: 'div', container: this.task, className: 'icon-box' });
    this.iconCheckmark = addElem({ tagName: 'span', container: this.iconBox, className: 'icon-done_outline' });
    this.iconCheckmark.addEventListener('click', this.taskDone);
    this.iconEdit = addElem({ tagName: 'span', container: this.iconBox, className: 'icon-edit-pencil' });
    this.iconEdit.addEventListener('click', this.updateTask);
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
    this.termIcon = addElem({ tagName: 'span', container: this.deadline, className: 'circle' });
    this.termIcon.style.backgroundColor = taskColor;
  }

  updateTask = () => {
    console.log('task update');
  }

  taskDone = () => {
    console.log('Task done');
  }
}
