import { addElem } from './addElem';
import { wrapper } from './wrapper';
import Modal from './modal';


class TasksList {
  constructor() {
    const container = addElem({ tagName: 'div', container: wrapper, className: 'tasks-container' });
    this.titleWrap = addElem({ tagName: 'div', container, className: 'title-wrap' });
    this.btnAddTodo = addElem({
      tagName: 'button', container: this.titleWrap, className: 'add-btn', text: 'Add new todo', id: 'myBtn',
    });
    this.btnAddTodo.addEventListener('click', this.openModal());
    this.span = addElem({
      tagName: 'span', container: this.titleWrap, className: 'archive', text: 'Show resolved todos',
    });
    this.contentWrap = addElem({ tagName: 'div', container, className: 'content-wrap' });
    this.task = addElem({ tagName: 'div', container: this.contentWrap, className: 'task' });
  }

  openModal = (event) => {
    // Get the modal
    // const modal = new Modal();
  };
}

export default TasksList;
