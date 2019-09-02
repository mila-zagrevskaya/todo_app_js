import moment from 'moment';
import { addElem } from './addElem';

export class Task {
  constructor({
    contentWrap, title, description, deadline, id, expired,
  }) {
    const time = this._countTime(deadline);
    const formatedTime = this._getFormatedTime(time);
    const taskColor = this._getTaskColor(time);
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
      tagName: 'h6', container: this.deadline, className: 'term', text: formatedTime,
    });
    this.termIcon = addElem({ tagName: 'span', container: this.deadline, className: 'circle' });
    this.termIcon.style.backgroundColor = taskColor;
  }

  _countTime = (deadline) => {
    const date = moment(new Date().getTime());
    const timeDeadline = moment(deadline);
    const minutes = timeDeadline.diff(date, 'minutes');
    const hours = timeDeadline.diff(date, 'hours');
    const days = timeDeadline.diff(date, 'days');
    return { minutes, hours, days };
  };

  _getFormatedTime = ({ minutes, hours, days }) => {
    if (days >= 1) {
      const hour = (hours - (days * 24));
      return (`${days} day(s) ${hour} hour(s)`);
    }
    if (hours >= 1) {
      const minute = (minutes - (hours * 60));
      return (`${hours} hour(s) ${minute} minute(s)`);
    }
    return (`${minutes} minute(s)`);
  }

  _getTaskColor = ({ hours, days }) => {
    if (days >= 1) {
      return ('#508775');
    }
    if (hours >= 4) {
      return ('#e8d64f');
    }
    return ('#c23232');
  }

  editTask = () => {
    console.log('task update');
  }

  taskDone = () => {
    console.log('Task done');
  }
}
