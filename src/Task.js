import moment from 'moment';
import { createElementWithAttributes } from './createElementWithAttributes';
import { app } from './index';
import { tasksUrl } from './constans';

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
      contentWrap, id, expired, title, description, doneStatus,
    } = this.item;
    const task = createElementWithAttributes({
      tagName: 'div',
      container: contentWrap,
      attributes: {
        className: 'task-item', id, expired, doneStatus,
      },
    });

    const iconBox = createElementWithAttributes({
      tagName: 'div',
      container: task,
      attributes: { className: 'icon-box' },
    });
    this.isDone = createElementWithAttributes({
      tagName: 'span',
      container: iconBox,
      attributes: { className: 'icon-checkmark', style: `color: ${this._getIsDoneColor(this.item.doneStatus)}` },
      eventType: 'click',
      eventHandler: this.changeDoneStatus,
    });
    const iconEdit = createElementWithAttributes({
      tagName: 'span',
      container: iconBox,
      attributes: { className: 'icon-edit-pencil' },
      eventType: 'click',
      eventHandler: this.editTask,
    });

    const titleTask = createElementWithAttributes({
      tagName: 'h5',
      container: task,
      attributes: { className: 'title', textContent: title },
    });

    const descriptionTask = createElementWithAttributes({
      tagName: 'p',
      container: task,
      attributes: { className: 'description', textContent: description },
    });

    const deadlineTask = createElementWithAttributes({
      tagName: 'div',
      container: task,
      attributes: { className: 'deadline' },
    });

    const term = createElementWithAttributes({
      tagName: 'h6',
      container: deadlineTask,
      attributes: { className: 'term', textContent: this.formatedTime },
    });

    const termIcon = createElementWithAttributes({
      tagName: 'span',
      container: deadlineTask,
      attributes: { className: 'circle', style: `background-color: ${this.taskColor}` },
    });
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

  _getIsDoneColor = (doneStatus) => {
    if (doneStatus === true) {
      return ('#508775');
    }
    return '#000';
  }

  editTask = () => {
    console.log('task update');
  }

  _updateDoneStatus = (item) => fetch(`${tasksUrl}/${item.id}`, {
    method: 'PATCH',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ doneStatus: item.doneStatus }),
  });

  changeDoneStatus = async () => {
    this.item.doneStatus = !this.item.doneStatus;
    this._getIsDoneColor(this.item.doneStatus);
    await this._updateDoneStatus(this.item);
  }
}
