import _ from 'lodash';
import '../public/style/all.css';

import StartPageElement from './startPage';
import TaskList from './tasksList';

import { Modal } from './modal';


export const basicUrl = 'http://localhost:3000/';
export const tasksUrl = `${basicUrl}tasks`;

export const startElem = new StartPageElement();
export const tasksList = new TaskList();

export const openModal = () => {
  // Get the modal
  const modal = new Modal();
};
