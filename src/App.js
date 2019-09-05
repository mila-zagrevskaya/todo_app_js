import { Modal } from './Modal';
import {
  tasksUrl, tasksArchiveUrl, activeTasksUrl, completedTasksUrl, expiredTasksUrl,
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
    const items = await this._getItems(tasksUrl);
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
    const items = await this._getItems(tasksArchiveUrl);
    // const doneItems = await this._getItems(completedTasksUrl);
    controlBar.renderControlBar('expired');
    tasksList.updateItems(items);
  }

  renderActiveTasksScreen = async () => {
    this._cleanContainers();
    const items = await this._getItems(activeTasksUrl);
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
