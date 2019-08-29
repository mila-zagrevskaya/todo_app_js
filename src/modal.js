import { addElem } from './addElem';
import { wrapper } from './wrapper';
import { tasksUrl, app } from './index';


const formFields = [
  {
    id: 'title',
    label: 'titleWrap',
    mess: 'Title field cannot be empty',
    value: '',
    errorContent: '',
  },
  {
    id: 'description',
    label: 'descriptionWrap',
    mess: 'Description field cannot be empty',
    value: '',
    errorContent: '',
  },
  {
    id: 'deadline',
    label: 'deadlineWrap',
    mess: 'Invalid date format',
    value: '',
    currentError: '',
  },
];


export class Modal {
  constructor() {
    this.formContainer = addElem({
      tagName: 'div', container: wrapper, className: 'modal',
    });
    this.formContainer.addEventListener('click', this.closeModal);

    this.todoForm = addElem({
      tagName: 'form', container: this.formContainer, className: 'todo-form modal-content',
    });
    this.todoForm.onsubmit = this.sendForm;

    this.todoClose = addElem({
      tagName: 'span', container: this.todoForm, className: 'icon-close close',
    });
    this.todoClose.addEventListener('click', this.closeModal);

    this.titleWrap = addElem({
      tagName: 'div', container: this.todoForm, className: 'titleWrap', id: 'title',
    });

    this.title = addElem({
      tagName: 'input', container: this.titleWrap, className: 'todo-title form-control',
    });
    this.title.type = 'text';
    this.title.placeholder = 'Title';
    this.title.oninput = this.onChangeHandler;

    this.outputInfo = addElem({
      tagName: 'p', container: this.titleWrap, className: 'errInfo',
    });

    this.descriptionWrap = addElem({
      tagName: 'div', container: this.todoForm, className: 'descriptionWrap', id: 'description',
    });

    this.description = addElem({
      tagName: 'textarea', container: this.descriptionWrap, className: 'todo-description form-control',
    });
    this.description.placeholder = 'Description';
    this.description.rows = '3';
    this.description.oninput = this.onChangeHandler;

    this.outputInfo = addElem({
      tagName: 'p', container: this.descriptionWrap, className: 'errInfo',
    });

    this.deadlineWrap = addElem({
      tagName: 'div', container: this.todoForm, className: 'deadlineWrap', id: 'deadline',
    });

    this.deadline = addElem({
      tagName: 'input', container: this.deadlineWrap, className: 'todo-deadline form-control',
    });
    this.deadline.type = 'datetime-local';
    this.deadline.placeholder = 'Deadline';
    this.deadline.min = new Date().getTime();
    this.deadline.oninput = this.onChangeHandler;

    this.outputInfo = addElem({
      tagName: 'p', container: this.deadlineWrap, className: 'errInfo',
    });

    this.buttonsContainer = addElem({
      tagName: 'div',
      container: this.todoForm,
      className: 'buttons-container',
    });

    this.createButton = addElem({
      tagName: 'button', container: this.buttonsContainer, className: 'button create-button', text: 'Create',
    });
    this.createButton.type = 'submit';
  }

  closeModal = (ev) => {
    if (
      ev.target === this.formContainer
      || ev.target === this.todoClose
      || ev.target === this.cancelButton
    ) {
      this.formContainer.remove();
    }
  }

  isValidField = (value, id) => {
    let isError = Boolean(value);
    if (id === 'deadline') {
      const isValidDate = new Date(value).getTime() > new Date().getTime();
      !isValidDate && (isError = false);
    }
    return isError;
  }

  onChangeHandler = ({ target }) => {
    const { parentNode, value } = target;
    this.fieldUpdate(parentNode, value);
  }

  fieldUpdate = (parentNode, value) => {
    const activeInput = formFields.find((el) => parentNode.id === el.id);
    const errComponent = parentNode.querySelector('.errInfo');
    activeInput.value = value.trim();
    activeInput.currentError = this.isValidField(activeInput.value, activeInput.id)
      ? '' : activeInput.mess;
    errComponent.textContent = activeInput.currentError;
  }

  postTask = () => {
    const task = {
      title: formFields[0].value,
      description: formFields[1].value,
      deadline: new Date(formFields[2].value).getTime(),
      id: new Date().getTime(),
      doneStatus: false,
    };

    return fetch(tasksUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
  };

  sendForm = async (event) => {
    event.preventDefault();
    let isValidForm = true;
    formFields.map((el) => {
      const parentNode = document.getElementById(el.id);
      this.fieldUpdate(parentNode, el.value);
      el.currentError && (isValidForm = false);
    });
    if (isValidForm) {
      await this.postTask();
      this.formContainer.remove();
      app.updateTasks();
    }
  }
}
