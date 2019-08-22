export const addElem = function (tagName, container) {
  return (container || document.body)
    .appendChild(
      document.createElement(tagName),
    );
};

export class Todo {
  constructor() {
    const wrapper = document.querySelector('.wrapper');
    this.todoForm = addElem('form', wrapper);
    this.todoForm.className = 'todoForm';
    this.title = addElem('input', this.todoForm);
    this.title.type = 'text';
    this.title.placeholder = 'Title';
    this.title.className = 'todo-title';
    this.description = addElem('input', this.todoForm);
    this.description.type = 'text';
    this.description.className = 'todo-description';
    this.description.placeholder = 'Description';
    this.description.rows = '3';
    this.deadline = addElem('input', this.todoForm);
    this.deadline.type = 'date';
    this.deadline.placeholder = 'Deadline';
    this.deadline.className = 'todo-deadline';
    this.deadline.min = new Date().toLocaleDateString();
    this.createBtn = addElem('button', this.todoForm);
    this.createBtn.className = 'createBtn';
    this.createBtn.textContent = 'Create';
  }
}
