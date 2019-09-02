import { Modal } from './modal';
import {
  tasksUrl, activeTasksUrl, expiredTasksUrl, controlBar, tasksList,
} from './index';
import { EmptyState } from './emptyState';


export class App {
  openModal = () => new Modal();

  getItems = (url) => fetch(url)
    .then(
      response => response.json(),
    )

  updateExpiredState = (item) => fetch(`${tasksUrl}/${item.id}`, {
    method: 'PATCH',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ expired: item.expired }),
  })

  isExpiredTask = (deadline) => {
    const date = new Date().getTime();
    const expire = date >= deadline;
    return expire;
  }

  init = async () => {
    const items = await this.getItems(tasksUrl);
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const isExpired = this.isExpiredTask(item.deadline);
      if (isExpired !== item.expired) {
        item.expired = isExpired;
        await this.updateExpiredState(item);
      }
    }
  }

  createExpiredList = async () => {
    const items = await this.getItems(expiredTasksUrl);
    tasksList.updateItems(items);
    controlBar.makeControlsBarIsExpired();
  }

  createActiveTasksList = async () => {
    const items = await this.getItems(activeTasksUrl);
    controlBar.makeControlsBarIsActive();
    items.length
      ? tasksList.updateItems(items)
      : new EmptyState();
  }

  createStartScreen = async () => {
    await this.init();
    this.createActiveTasksList();
  }
}
