import moment from 'moment';
import { addElem } from './addElem';

export class Task {
  constructor({
    contentWrap, title, description, deadline, doneStatus, id, expired,
  }) {
    const time = this._countTime(deadline);
    this.formatedTime = this._getFormatedTime(time);
    this.taskColor = this._getTaskColor(time);
    this.description = description;
    this.title = title;
    this.task = addElem({
      tagName: 'div', container: contentWrap, className: 'task-item', id, expired,
    });
    this.renderTaskItems();
  }

  renderTaskItems = () => {
    const iconBox = addElem({ tagName: 'div', container: this.task, className: 'icon-box' });
    const iconCheckmark = addElem({ tagName: 'span', container: iconBox, className: 'icon-done_outline' });
    iconCheckmark.addEventListener('click', this.taskDone);
    const iconEdit = addElem({ tagName: 'span', container: iconBox, className: 'icon-edit-pencil' });
    iconEdit.addEventListener('click', this.editTask);
    const title = addElem({
      tagName: 'h5', container: this.task, className: 'title', text: this.title,
    });
    const description = addElem({
      tagName: 'p', container: this.task, className: 'description', text: this.description,
    });
    this.deadline = addElem({ tagName: 'div', container: this.task, className: 'deadline' });
    this.term = addElem({
      tagName: 'h6', container: this.deadline, className: 'term', text: this.formatedTime,
    });
    this.termIcon = addElem({ tagName: 'span', container: this.deadline, className: 'circle' });
    this.termIcon.style.backgroundColor = this.taskColor;
  };

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
    if (minutes <= 0) {
      return (`${0} minutes`);
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
