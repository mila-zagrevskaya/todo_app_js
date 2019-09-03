import { Modal } from './Modal';
import { tasksUrl, activeTasksUrl, expiredTasksUrl } from './constans';
import { controlBar, tasksList } from './index';
import { EmptyState } from './EmptyState';

export class App {
  openModal = () => new Modal();

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

  renderExpiredTasksScreen = async () => {
    const items = await this._getItems(expiredTasksUrl);
    tasksList.updateItems(items);
    controlBar._renderControlsBarForExpiredTasks();
  }

  renderActiveTasksScreen = async () => {
    const items = await this._getItems(activeTasksUrl);
    controlBar._renderControlsBarForActiveTasks();
    items.length
      ? tasksList.updateItems(items)
      : new EmptyState();
  }

  init = async () => {
    await this._updateTasksExpiredState();
    this.renderActiveTasksScreen();
  }
}
