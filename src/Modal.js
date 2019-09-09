import { createElementWithAttributes } from './createElementWithAttributes';
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
  constructor(item) {
    this.item = item;
    this._renderModalWindow();
  }

  _renderModalWindow = () => {
    this.formContainer = createElementWithAttributes({
      tagName: 'div',
      container: wrapper,
      attributes: { className: 'modal' },
      eventType: 'click',
      eventHandler: this._closeModal,
    });

    this.todoForm = createElementWithAttributes({
      tagName: 'form',
      container: this.formContainer,
      attributes: { className: 'todo-form modal-content' },
      eventType: 'submit',
      eventHandler: this._sendForm,
    });

    this.todoClose = createElementWithAttributes({
      tagName: 'span',
      container: this.todoForm,
      attributes: { className: 'icon-close close' },
      eventType: 'click',
      eventHandler: this._closeModal,
    });

    const titleWrap = this._getFieldWrapper('title');

    const title = createElementWithAttributes({
      tagName: 'input',
      container: titleWrap,
      attributes: { type: 'text', className: 'form-control', placeholder: 'Title' },
      eventType: 'input',
      eventHandler: this._onChangeHandler,
    });

    const descriptionWrap = this._getFieldWrapper('description');

    const description = createElementWithAttributes({
      tagName: 'textarea',
      container: descriptionWrap,
      attributes: { className: 'form-control', placeholder: 'Description', rows: '3' },
      eventType: 'input',
      eventHandler: this._onChangeHandler,
    });

    const deadlineWrap = this._getFieldWrapper('deadline');

    const deadline = createElementWithAttributes({
      tagName: 'input',
      container: deadlineWrap,
      attributes: {
        type: 'datetime-local', className: 'form-control', placeholder: 'Deadline', min: new Date().getTime(),
      },
      eventType: 'input',
      eventHandler: this._onChangeHandler,
    });

    this.buttonsContainer = createElementWithAttributes({
      tagName: 'div',
      container: this.todoForm,
      attributes: { className: 'buttons-container' },
    });
    this._updateModal();
  };

  _creatingButtonForCreateTask = () => {
    const buttonForCreate = createElementWithAttributes({
      tagName: 'button',
      container: this.buttonsContainer,
      attributes: { className: 'button create-button', textContent: 'Create', type: 'button' },
      eventType: 'click',
      eventHandler: this._sendForm,
    });
  }

  _creatingButtonsForEditTask = () => {
    this.buttonForCancel = createElementWithAttributes({
      tagName: 'button',
      container: this.buttonsContainer,
      attributes: { className: 'button cancel-button', textContent: 'Cancel' },
      eventType: 'click',
      eventHandler: this._closeModal,
    });
    const buttonForSaveEdit = createElementWithAttributes({
      tagName: 'button',
      container: this.buttonsContainer,
      attributes: { className: 'button update-button', type: 'button', textContent: 'Save' },
      eventType: 'click',
      eventHandler: this._saveTaskChanges,
    });
  }

  _updateModal = () => {
    const { id } = this.item;
    if (id) {
      this._creatingButtonsForEditTask();
      this._fillFormFields(this.item);
      return;
    }
    this._creatingButtonForCreateTask();
  }

  _fillFormFields = (item) => {
    formFields.forEach(el => {
      const parentNode = document.getElementById(el.id);
      const itemValue = item[el.id];
      const valueFormField = el.id === 'deadline'
        ? new Date(itemValue).toISOString().substring(0, 16)
        : itemValue;
      this._updateField(parentNode, valueFormField);
      const inputElement = parentNode.querySelector('.form-control');
      inputElement.value = valueFormField;
      return valueFormField;
    });
  }

  _saveTaskChanges = () => {
    const changedItem = {
      title: formFields[0].value,
      description: formFields[1].value,
      deadline: new Date(formFields[2].value).getTime(),
      id: this.item.id,
      doneStatus: this.item.doneStatus,
      expired: this.item.expired,
    };
    app.updateTask(changedItem);
    this.formContainer.remove();
    app.init();
  }

  _getFieldWrapper = (id) => {
    const fieldWrapper = createElementWithAttributes({
      tagName: 'div',
      container: this.todoForm,
      attributes: { id },
    });
    this.errorInfo = createElementWithAttributes({
      tagName: 'p',
      container: fieldWrapper,
      attributes: { className: 'errInfo' },
    });
    return fieldWrapper;
  }

  _closeModal = (ev) => {
    if (
      ev.target === this.formContainer
      || ev.target === this.todoClose
      || ev.target === this.buttonForCancel
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

  _onChangeHandler = ({ target }) => {
    const { parentNode, value } = target;
    this._updateField(parentNode, value);
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

  _sendForm = async (event) => {
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
