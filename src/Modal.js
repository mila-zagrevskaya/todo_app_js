import { addElem, createElementWithAttributes } from './addElem';
import { wrapper } from './wrapper';
import { tasksUrl } from './constans';
import { app } from './index';


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
    this.renderModalWindow();
  }

  renderModalWindow = () => {
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

    const titleWrap = this.getFieldWrapper('title');

    const title = createElementWithAttributes({
      tagName: 'input',
      container: titleWrap,
      attributes: { type: 'text', className: 'form-control', placeholder: 'Title' },
      eventType: 'input',
      eventHandler: this.onChangeHandler,
    });

    const descriptionWrap = this.getFieldWrapper('description');

    const description = createElementWithAttributes({
      tagName: 'textarea',
      container: descriptionWrap,
      attributes: { className: 'form-control', placeholder: 'Description', rows: '3' },
      eventType: 'input',
      eventHandler: this.onChangeHandler,
    });

    const deadlineWrap = this.getFieldWrapper('deadline');

    const deadline = createElementWithAttributes({
      tagName: 'input',
      container: deadlineWrap,
      attributes: {
        type: 'datetime-local', className: 'form-control', placeholder: 'Deadline', min: new Date().getTime(),
      },
      eventType: 'input',
      eventHandler: this.onChangeHandler,
    });

    const buttonsContainer = addElem({
      tagName: 'div',
      container: this.todoForm,
      className: 'buttons-container',
    });

    const createButton = addElem({
      tagName: 'button', container: buttonsContainer, className: 'button create-button', text: 'Create',
    });
    createButton.type = 'submit';
  };

  getFieldWrapper = (id) => {
    const fieldWrapper = addElem({
      tagName: 'div', className: null, container: this.todoForm, id,
    });
    this.errorInfo = addElem({
      tagName: 'p', container: fieldWrapper, className: 'errInfo',
    });
    return fieldWrapper;
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

  _isValidField = (value, id) => {
    let isError = Boolean(value);
    if (id === 'deadline') {
      const isValidDate = new Date(value).getTime() > new Date().getTime();
      !isValidDate && (isError = false);
    }
    return isError;
  }

  onChangeHandler = ({ target }) => {
    const { parentNode, value } = target;
    this._updateField(parentNode, value);
    console.log('target', target, 'parentNode', parentNode);
  }

  _updateField = (parentNode, value) => {
    const activeInput = formFields.find((el) => parentNode.id === el.id);
    const errComponent = parentNode.querySelector('.errInfo');
    activeInput.value = value.trim();
    activeInput.currentError = this._isValidField(activeInput.value, activeInput.id)
      ? '' : activeInput.mess;
    errComponent.textContent = activeInput.currentError;
  }

  _postTask = () => {
    const task = {
      title: formFields[0].value,
      description: formFields[1].value,
      deadline: new Date(formFields[2].value).getTime(),
      id: new Date().getTime(),
      doneStatus: false,
      expired: false,
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
      this._updateField(parentNode, el.value);
      el.currentError && (isValidForm = false);
    });
    if (isValidForm) {
      await this._postTask();
      this.formContainer.remove();
      app.init();
    }
  }
}
