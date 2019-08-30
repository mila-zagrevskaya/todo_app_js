import { addElem } from './addElem';
import { wrapper } from './wrapper';
import { TasksList } from './tasksList';


export class Archive {
  constructor(items) {
    this.tasksContainer = addElem({ tagName: 'div', container: wrapper, className: 'tasks-container' });
    this.titleWrap = addElem({ tagName: 'div', container: this.tasksContainer, className: 'title-wrap' });
    this.span = addElem({
      tagName: 'span', container: this.titleWrap, className: 'icon-arrow-left-thick',
    });
    this.tasksWrap = addElem({ tagName: 'div', container: this.tasksContainer, className: 'tasks-wrap' });
    TasksList.showExpiredItems;
    console.log('archive');
  }
}
