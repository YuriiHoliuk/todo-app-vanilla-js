import { ToDoApp } from './todo-app.js';

const rootEl = document.querySelector('#app');

const todoApp = new ToDoApp(rootEl);
todoApp.render();
