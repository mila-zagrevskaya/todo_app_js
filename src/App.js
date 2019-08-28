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

  updateTasks = async () => {
    wrapper.textContent = '';
    const items = await this.getItems();
    items.length
      ? new TasksList(items)
      : new EmptyState();
  }
}
