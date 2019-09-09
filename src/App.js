import { Modal } from './Modal';
import {
  tasksUrl, activeTasksUrl, expireTasksUrl, tasksdoneStatusUrl,
} from './constans';
import { tasksContainer, containerForEmptyScreen } from './wrapper';
import { controlBar, tasksList } from './index';
import { EmptyState } from './EmptyState';


export class App {
  openModal = (item) => new Modal(item);

  _getItems = (url) => fetch(url)
    .then(
      response => response.json(),
    )

  updateTask = (item) => fetch(`${tasksUrl}/${item.id}`, {
    method: 'PUT',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(item),
  })

  _isExpiredTask = (deadline) => {
    const date = new Date().getTime();
    const expired = date >= deadline;
    return expired;
  }

  _updateTasksExpiredState = async () => {
    const items = await this._getItems(tasksUrl);
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];
      const isExpired = this._isExpiredTask(item.deadline);
      if (isExpired !== item.expired) {
        item.expired = isExpired;
        // eslint-disable-next-line no-await-in-loop
        await this.updateItem(item);
      }
    }
  }

  _getArchivedTasks = async () => {
    const expiredItems = await this._getItems(expireTasksUrl);
    const doneItems = await this._getItems(tasksdoneStatusUrl);
    const archiveTasks = [...doneItems, ...expiredItems];
    const items = [];
    archiveTasks.map(item => {
      if (!items.find(task => task.id === item.id)) {
        items.push(item);
      }
    });
    return items;
  }

  renderArchivedTasksScreen = async () => {
    this._cleanContainers();
    const items = await this._getArchivedTasks();
    controlBar.renderControlBar('expired');
    tasksList.updateItems(items);
  }

  renderActiveTasksScreen = async () => {
    this._cleanContainers();
    const items = await this._getItems(activeTasksUrl);
    this._getArchivedTasks();
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
