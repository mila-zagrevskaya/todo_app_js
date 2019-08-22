import { addElem } from './addElem';
import { wrapper } from './wrapper';
import Modal from './modal';


class StartPageElement {
  constructor() {
    const startBox = addElem({
      tagName: 'div', container: wrapper, className: 'start-box', text: null,
    });
    this.title = addElem({
      tagName: 'h2', container: startBox, className: 'h2', text: 'No active todos',
    });
    this.addButton = addElem({
      tagName: 'button', container: startBox, className: 'add-btn', text: 'Add todo', id = 'myBtn',
    });
    this.addButton.addEventListener('click', this.openModal);
    this.link = addElem({
      tagName: 'a', container: startBox, className: 'show-resolved', text: 'Show resolved todos',
    });
    this.link.src = '#';
  }

  openModal = (even) => {
    // Get the modal
    const modal = new Modal();
  }
}


export default StartPageElement;
