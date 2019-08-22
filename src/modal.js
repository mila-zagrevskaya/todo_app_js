
import { EIDRM } from 'constants';
import { addElem } from './addElem';
import { wrapper } from './wrapper';

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


class Modal {
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
      tagName: 'p', container: this.descriptionWrap, className: 'errInfo', text: null,
    });

    this.deadlineWrap = addElem({
      tagName: 'div', container: this.todoForm, className: 'deadlineWrap', text: null, id: 'deadline',
    });

    this.deadline = addElem({
      tagName: 'input', container: this.deadlineWrap, className: 'todo-deadline form-control', text: null,
    });
    this.deadline.type = 'date';
    this.deadline.placeholder = 'Deadline';
    this.deadline.min = new Date().getTime();
    this.deadline.oninput = this.onChangeHandler;

    this.outputInfo = addElem({
      tagName: 'p', container: this.deadlineWrap, className: 'errInfo', text: null,
    });

    this.createBtn = addElem({
      tagName: 'button', container: this.todoForm, className: 'createBtn', text: 'Create',
    });
    this.createBtn.onsubmit = this.sendForm;
  }

  closeModal = (ev) => {
    if (ev.target === this.formContainer) {
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
    this.fieldCheck(parentNode, value);
  }

  fieldCheck = (parentNode, value) => {
    const activeInput = formFields.find((el) => parentNode.id === el.id);
    const errComponent = parentNode.querySelector('.errInfo');
    activeInput.value = value.trim();
    activeInput.currentError = this.isValidField(activeInput.value, activeInput.id)
      ? '' : activeInput.mess;
    errComponent.textContent = activeInput.currentError;
  }

  sendForm = (ev) => {
    ev.preventDefault();
    let isValidForm = true;
    formFields.map((el) => {
      const parentNode = document.getElementById(el.id);
      this.fieldCheck(parentNode, el.value);
      el.currentError && (isValidForm = false);
      console.log(`${el.label}: ${el.value}`);
    });
    if (isValidForm) {
      return;
    }
    console.log('is not valid');
  }
}


export default Modal;
