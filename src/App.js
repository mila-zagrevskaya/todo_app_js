
import { wrapper } from './wrapper';
import { Modal } from './modal';
import { tasksUrl } from './index';
import { EmptyState } from './emptyState';
import { TasksList } from './tasksList';


export class App {
  openModal = () => new Modal();

  getItems = () => fetch(tasksUrl)
    .then(
      response => response.json(),
    )

  getActiveItems = () => fetch(`${tasksUrl}/?expired=false`)
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
    const items = await this.getItems();
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const isExpired = this.isExpiredTask(item.deadline);
      if (isExpired !== item.expired) {
        item.expired = isExpired;
        await this.updateExpiredState(item, { expired: isExpired });
      }
    }
  }

  createStartScreen = async () => {
    wrapper.textContent = '';
    await this.init();
    const items = await this.getActiveItems();
    items.length
      ? new TasksList(items)
      : new EmptyState();
  }
}
