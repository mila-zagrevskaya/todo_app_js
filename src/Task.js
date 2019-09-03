import moment from 'moment';
import { addElem } from './addElem';

export class Task {
  constructor(item) {
    this.item = item;
    this.init();
  }

  init = () => {
    const { deadline } = this.item;
    const time = this._countTime(deadline);
    this.formatedTime = this._getFormatedTime(time);
    this.taskColor = this._getTaskColor(time);
    this.renderTaskItems();
  };

  renderTaskItems = () => {
    const {
      contentWrap, id, expired, title, description,
    } = this.item;
    const task = addElem({
      tagName: 'div', container: contentWrap, className: 'task-item', id, expired,
    });
    const iconBox = addElem({ tagName: 'div', container: task, className: 'icon-box' });
    const iconCheckmark = addElem({ tagName: 'span', container: iconBox, className: 'icon-done_outline' });
    iconCheckmark.addEventListener('click', this.taskDone);
    const iconEdit = addElem({ tagName: 'span', container: iconBox, className: 'icon-edit-pencil' });
    iconEdit.addEventListener('click', this.editTask);
    const titleTask = addElem({
      tagName: 'h5', container: task, className: 'title', text: title,
    });
    const descriptionTask = addElem({
      tagName: 'p', container: task, className: 'description', text: description,
    });
    const deadlineTask = addElem({ tagName: 'div', container: task, className: 'deadline' });
    const term = addElem({
      tagName: 'h6', container: deadlineTask, className: 'term', text: this.formatedTime,
    });
    const termIcon = addElem({ tagName: 'span', container: deadlineTask, className: 'circle' });
    termIcon.style.backgroundColor = this.taskColor;
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
