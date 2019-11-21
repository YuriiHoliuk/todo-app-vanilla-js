import { TodoApp } from './todo-app.js';

const todoApp = new TodoApp(document.querySelector('#app'));

todoApp.render();

// setTimeout(() => {
//   todoApp.destroy();
//
//   setTimeout(() => todoApp.render(), 5000);
// }, 10000);
