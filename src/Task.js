import { addElem } from './addElem';

export class Task {
  constructor({
    contentWrap, title, description, deadline, taskColor, id, expired,
  }) {
    const task = addElem({
      tagName: 'div', container: contentWrap, className: 'task-item', id, expired,
    });
    const iconBox = addElem({ tagName: 'div', container: task, className: 'icon-box' });
    const iconCheckmark = addElem({ tagName: 'span', container: iconBox, className: 'icon-done_outline' });
    iconCheckmark.addEventListener('click', this.taskDone);
    const iconEdit = addElem({ tagName: 'span', container: iconBox, className: 'icon-edit-pencil' });
    iconEdit.addEventListener('click', this.editTask);
    this.title = addElem({
      tagName: 'h5', container: task, className: 'title', text: title,
    });
    this.description = addElem({
      tagName: 'p', container: task, className: 'description', text: description,
    });
    this.deadline = addElem({ tagName: 'div', container: task, className: 'deadline' });
    this.term = addElem({
      tagName: 'h6', container: this.deadline, className: 'term', text: deadline,
    });
    this.termIcon = addElem({ tagName: 'span', container: this.deadline, className: 'circle' });
    this.termIcon.style.backgroundColor = taskColor;
  }


  editTask = () => {
    console.log('task update');
  }

  taskDone = () => {
    console.log('Task done');
  }
}
