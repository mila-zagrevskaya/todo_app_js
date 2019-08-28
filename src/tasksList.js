import { addElem } from './addElem';
import { wrapper } from './wrapper';
import { Modal } from './modal';
import { Task } from './task';
import { tasksUrl, startElem } from './index';


export const container = addElem({ tagName: 'div', container: wrapper, className: 'tasks-container' });

class TasksList {
  constructor() {
    this.titleWrap = addElem({ tagName: 'div', container, className: 'title-wrap' });
    this.btnAddTodo = addElem({
      tagName: 'button', container: this.titleWrap, className: 'add-btn', text: 'Add new todo', id: 'myBtn',
    });
    this.btnAddTodo.addEventListener('click', startElem.openModal);
    this.span = addElem({
      tagName: 'span', container: this.titleWrap, className: 'archive', text: 'Show resolved todos',
    });
    this.contentWrap = addElem({ tagName: 'div', container, className: 'content-wrap' });
    this.updateTasks();
  }

  updateTasks = () => {
    this.contentWrap.textContent = '';
    fetch(tasksUrl)
      .then(
        response => response.json()
          .then(
            json => json.map(item => {
              this.taskItem = new Task(
                this.contentWrap, item.title, item.description, new Date(item.deadline).getHours(),
              );
            }),
          ),
      );
  }
}

export default TasksList;
