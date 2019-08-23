import { addElem } from './addElem';
import { wrapper } from './wrapper';
import Modal from './modal';
import Task from './task';

import { url } from './index';


export const container = addElem({ tagName: 'div', container: wrapper, className: 'tasks-container' });

class TasksList {
  constructor() {
    this.titleWrap = addElem({ tagName: 'div', container, className: 'title-wrap' });
    this.btnAddTodo = addElem({
      tagName: 'button', container: this.titleWrap, className: 'add-btn', text: 'Add new todo', id: 'myBtn',
    });
    this.btnAddTodo.addEventListener('click', this.openModal());
    this.span = addElem({
      tagName: 'span', container: this.titleWrap, className: 'archive', text: 'Show resolved todos',
    });
    this.contentWrap = addElem({ tagName: 'div', container, className: 'content-wrap' });
    this.getTasks();
  }

  openModal = (event) => {
    // Get the modal
    // const modal = new Modal();
  };

  getTasks = () => {
    fetch(url)
      .then(
        response => response.json()
          .then(
            json => json.map(item => {
              console.log('item', item);
              this.taskItem = new Task(item.title, item.description, item.deadline);
            //   console.log(taskItem);
            }),
          ),
      );
  }
}
export default TasksList;
