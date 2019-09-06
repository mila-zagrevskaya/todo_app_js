import { Modal } from './Modal';
import {
  tasksUrl, activeTasksUrl, expireTasksUrl, tasksdoneStatusUrl,
} from './constans';
import { tasksContainer, containerForEmptyScreen } from './wrapper';
import { controlBar, tasksList } from './index';
import { EmptyState } from './EmptyState';


export class App {
  _getUrlForArchiveTasks = async () => {
    const expireItems = await this.getItems(expireTasksUrl);
    const doneItems = await this.getItems(tasksdoneStatusUrl);
    const archiveTasks = [...doneItems, ...expireItems];

    const items = [];
    archiveTasks.map(item => {
      if (!items.find(task => task.id === item.id)) {
        items.push(item);
        console.log('item');
      }
    });
    return items;
  }

  openModal = (item) => new Modal(item);

  getItems = (url) => fetch(url)
    .then(
      response => response.json(),
    )

  _updateExpiredState = (item) => fetch(`${tasksUrl}/${item.id}`, {
    method: 'PATCH',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ expired: item.expired }),
  })

  _isExpiredTask = (deadline) => {
    const date = new Date().getTime();
    const expire = date >= deadline;
    return expire;
  }

  _updateTasksExpiredState = async () => {
    const items = await this.getItems(tasksUrl);
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];
      const isExpired = this._isExpiredTask(item.deadline);
      if (isExpired !== item.expired) {
        item.expired = isExpired;
        // eslint-disable-next-line no-await-in-loop
        await this._updateExpiredState(item);
      }
    }
  }

  renderArchiveTasksScreen = async () => {
    this._cleanContainers();
    const items = await this._getUrlForArchiveTasks();
    controlBar.renderControlBar('expired');
    tasksList.updateItems(items);
  }

  renderActiveTasksScreen = async () => {
    this._cleanContainers();
    const items = await this.getItems(activeTasksUrl);
    this._getUrlForArchiveTasks();
    if (items.length) {
      controlBar.renderControlBar('active');
      tasksList.updateItems(items);
      return;
    }
    const emptyScreen = new EmptyState();
  }

  _cleanContainers = () => {
    containerForEmptyScreen.textContent = '';
    tasksContainer.textContent = '';
  }

  init = async () => {
    await this._updateTasksExpiredState();
    this.renderActiveTasksScreen();
  }
}
